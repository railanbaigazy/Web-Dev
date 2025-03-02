import { Component, OnInit } from '@angular/core';
import { Photo } from '../photo';
import { AlbumsService } from '../albums.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-album-photos',
  imports: [],
  template: `
    <section>
      <button (click)="goBack()" class="return-btn"><i class="fa-solid fa-rotate-left"></i> Return</button>
      <ul>
        @if (!photos) {
          @for (_ of skeletons; track $index) {
            <li><div class="skeleton"></div></li>
          }
        }
        @for (photo of photos; track photo.id) {
          <li>
            <img [src]="photo.thumbnailUrl" [alt]="photo.title">
          </li>
        }
      </ul>
    </section>
  `,
  styleUrl: './album-photos.component.scss'
})
export class AlbumPhotosComponent implements OnInit {
  photos: Photo[] | null = null;
  skeletons = Array.from({ length: 30 });

  constructor(private route: ActivatedRoute, private router: Router, private albumsService: AlbumsService) { }

  ngOnInit() {
    const albumId = Number(this.route.snapshot.paramMap.get('id'));

    setTimeout(() => {
      this.albumsService.getAlbumPhotos(albumId).subscribe(data => {
        this.photos = data;
      });
    }, 1000);
  }

  goBack() {
    this.router.navigate(['/albums']);
  }
}
