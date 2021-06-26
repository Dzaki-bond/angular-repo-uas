import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ProductDetailComponent} from '../product-detail/product-detail.component';
import {ApiService} from '../../services/api.service';
import {FileUploaderComponent} from '../file-uploader/file-uploader.component';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  title: any;
  //mendefinisikan variabel book sebagai objek
  book: any = {};
  //1. membuat koleksi books
  books: any = [];

  constructor(
    public dialog: MatDialog,
    public api: ApiService
  ) {
    this.title = 'Products';
    //3. Memanggil fungsi getBooks()
    this.getBooks();
  }

  ngOnInit(): void {

  }

  //2. Membuat fungsi

  loading!:boolean;
  getBooks()
  {
    this.loading=true;
    this.api.get('books').subscribe(result=>{
      this.books=result;
      this.loading=false;
    },error=>{
      this.loading=false;
      alert('Tidak dapat mengambil data');
    })
  }






  productDetail(data: any, idx: any) {
    let dialog = this.dialog.open(ProductDetailComponent, {
      width: '400px',
      data: data
    });
    dialog.afterClosed().subscribe(res => {
      if (res) {
        //jika idx=-1 (penambahan data baru) maka tambahkan data
        if (idx == -1) this.books.push(res);
        //jika tidak maka perbarui data
        else this.books[idx] = data;
      }
    });
  }

  loadingDelete:any={};
  deleteProduct(id: any, idx: any) {
    var conf = confirm('Delete item?');
    if (conf) {
      this.loadingDelete[idx]=true;
      this.api.delete('books/' + this.books[idx].id).subscribe(result => {
        this.books.splice(idx, 1);
        this.loadingDelete[idx]=false;
      }, error => {
        this.loadingDelete[idx]=false;
        alert('Tidak dapat menghapus data');
      });
    }
    }
  uploadFile(data: any)
  {
    let dialog=this.dialog.open(FileUploaderComponent, {
      width:'400px',
      data:data
    });
    dialog.afterClosed().subscribe((res: any)=>{
      return;
    });
  }
  downloadFile(data: any)
  {
    FileSaver.saveAs('http://api.sunhouse.co.id/bookstore/'+data.url);

  }


}
