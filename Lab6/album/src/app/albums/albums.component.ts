import { Component, OnInit } from '@angular/core';
import { AlbumsService } from '../albums.service';
import { Album } from '../album';
import { AlbumItemComponent } from '../album-item/album-item.component';

@Component({
  selector: 'app-albums',
  imports: [AlbumItemComponent],
  template: `
    <h2>Albums list:</h2>
    <ul>
      @for (album of albums; track album.id) {
        <app-album-item [album]="album" />
      }
    </ul>
  `,
  styleUrl: './albums.component.scss'
})
export class AlbumsComponent implements OnInit {
  albums: Album[] = [];

  constructor(private albumsService: AlbumsService) {}

  ngOnInit() {
    console.log('Waiting for albums data...');

    this.albumsService.getAllAlbums().subscribe(
      data => {
        this.albums = data;
        console.log('Albums received');
      },
      err => console.log('Error fetching errors:', err)
    );
  }
}
