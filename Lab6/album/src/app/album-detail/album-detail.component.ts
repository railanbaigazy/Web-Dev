import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AlbumsService } from '../albums.service';
import { Album } from '../album';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-album-detail',
  imports: [FormsModule, RouterLink],
  template: `
    <section class="album-detail">
      <button (click)="goBack()"><i class="fa-solid fa-rotate-left"></i> Return</button>
      <input [(ngModel)]="albumTitle" (ngModelChange)="onTitleChange()" [disabled]="!isChangable" type="text">
      <button (click)="onClickSaveTitle()" [disabled]="!isChanged || isSaving" [textContent]="isSaving ? 'Saving...' : 'Save'"></button>

      @if (isUpdated) {
        <div class="update-title-status">{{ updateStatus }}</div>
      }
      <a [routerLink]="['photos']">Photos</a>
    </section>
  `,
  styleUrl: './album-detail.component.scss'
})
export class AlbumDetailComponent implements OnInit {
  album!: Album;
  albumTitle: string = 'Loading...';
  isSaving = false;
  isChanged = false;
  isChangable = false;
  updateStatus: string = '';
  isUpdated = false;

  constructor(private route: ActivatedRoute, private router: Router, private albumsService: AlbumsService) { }

  ngOnInit() {
    const albumId = Number(this.route.snapshot.paramMap.get('id'));

    this.albumsService.getAlbumById(albumId).subscribe(data => {
      this.album = data;
      this.albumTitle = data.title;
      this.isChangable = true;
    });
  }

  goBack() {
    this.router.navigate(['/albums']);
  }

  onTitleChange() {
    this.isChanged = this.albumTitle !== this.album.title;
    this.isUpdated = false;
  }

  onClickSaveTitle() {
    this.isSaving = true;
    this.isChangable = false;
    this.album.title = this.albumTitle;

    this.albumsService.updateAlbum(this.album.id, this.album).subscribe(
      () => {
        console.log('Album updated successfully');
        this.isSaving = this.isChanged = false;
        this.isChangable = this.isUpdated = true;
        this.updateStatus = '✅ Title updated successfully';
      },
      err => {
        console.log('Error updating album:', err);
        this.isSaving = false;
        this.isChangable = this.isUpdated = true;
        this.updateStatus = '❌ Error updating album';
      }
    ); 
  }
}
