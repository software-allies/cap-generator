import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { LoopbackService } from '../loopback.service';
import { PaginationComponent } from '../pagination/pagination.component';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  @ViewChild('PaginationComponentChild', { static: false })
  paginationComponent: PaginationComponent;

  listings: any;
  currentPage: number;
  skipFilter: number;

  object: any;
  objectAPI: string;
  objectComponent: string;
  objects = [
    { object: 'account', api: 'Accounts' },
    { object: 'contact', api: 'Contacts' },
    { object: 'lead', api: 'Leads' },
    { object: 'opportunity', api: 'Opportunitys' }
  ];
  totalItems: number;

  constructor(
    private loopBackService: LoopbackService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {
    this.listings = [];
    this.skipFilter = null;
    this.totalItems = null;
    this.objectAPI = null;
    this.objectComponent = null;
  }

  ngOnInit() {
    this.activateRoute.params.subscribe(params => {
      this.object = this.objects.find(x => x.object === params.object);
      this.objectAPI = this.object.api;
      this.objectComponent = this.object.object;
      this.search(this.objectAPI);
    });
    this.activateRoute.queryParams.subscribe(queryParams => {
      this.ApplyQueryParams(queryParams);
    });
  }

  search(object: string) {
    this.loopBackService.getAllRequest(object).subscribe(res => {
      this.listings = res;
      if (object === 'Contacts' || object === 'Opportunitys') {
        let sfIds = [];
        for (let index in res) {
          sfIds.push({ SfId: res[index].AccountId });
        }
        sfIds = sfIds.filter(id => id.SfId !== null);
        const query = `/Accounts?filter={"where":{"or":${JSON.stringify(
          sfIds
        )}}}`;
        this.loopBackService
          .getWithFilter(query)
          .subscribe((accounts: Array<any>) => {
            this.listings.forEach((item, index) => {
              this.listings[index].accountName = accounts.filter(
                account => account.SfId === item.AccountId
              )[0].Name;
            });
          });
      }
    });
    if (!this.totalItems) {
      this.loopBackService.getTotalItems(object).subscribe(totalitmes => {
        this.totalItems = totalitmes;
      });
    }
  }

  deleteItem(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this record!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then(result => {
      if (result.value) {
        this.listings = this.listings.filter(acc => acc.id !== id);
        this.loopBackService.deleteItem(this.objectAPI, id).subscribe(res => {
          Swal.fire('Deleted!', 'Your record has been deleted.', 'success');
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your record is safe :)', 'error');
      }
    });
  }

  ApplyQueryParams(queryParams) {
    this.currentPage =
      queryParams && queryParams.Page ? Number(queryParams.Page) : 1;
  }

  actionPage(page: number) {
    this.currentPage = page;
    this.skipFilter = this.currentPage > 1 ? (this.currentPage - 1) * 20 : null;
    const pageQueryParam = this.currentPage === 1 ? null : this.currentPage;
    const navigationExtras: NavigationExtras = {
      queryParams: { Page: pageQueryParam },
      queryParamsHandling: 'merge'
    };
    this.router.navigate([`${this.objectComponent}`], navigationExtras);
    this.skipFilter = null;
  }
}
