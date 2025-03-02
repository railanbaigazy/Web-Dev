import { Component, OnInit } from '@angular/core';
import { AlbumsService } from '../albums.service';
import { Album } from '../album';
import { AlbumItemComponent } from '../album-item/album-item.component';

@Component({
  selector: 'app-albums',
  imports: [AlbumItemComponent],
  template: `
    <section>
      <h2>Albums list:</h2>
      <ul>
        @if (!albums) {
          @for (_ of skeletons; track $index) {
            <li class="skeleton"></li>
          }
        }

        @for (album of albums; track album.id) {
          <app-album-item [album]="album" (albumRemoved)="onAlbumRemoved($event)" />
        }
      </ul>
    </section>
  `,
  styleUrl: './albums.component.scss'
})
export class AlbumsComponent implements OnInit {
  albums: Album[] | null = null;
  skeletons = Array.from({ length: 40 });

  constructor(private albumsService: AlbumsService) {}

  ngOnInit() {
    console.log('Waiting for albums data...');

    setTimeout(() => {
      this.albumsService.getAllAlbums().subscribe(
        data => {
          this.albums = data;
          console.log('Albums received');
        },
        err => console.log('Error fetching errors:', err)
      );
    }, 1000);
  }

  onAlbumRemoved(album: Album) {
    if (this.albums) {
      this.albums = this.albums.filter(al => al.id !== album.id);
      this.albumsService.removeAlbum(album);
    }
  }
}
