import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Album } from '../album';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-album-item',
  imports: [RouterLink],
  template: `
    <li>
      <a [routerLink]="['/albums', album.id]">{{ album.title }}</a>
      <button (click)="removeAlbumItem()" ><i class="fa-solid fa-trash"></i></button>
    </li>
  `,
  styleUrl: './album-item.component.scss'
})
export class AlbumItemComponent {
  @Input() album!: Album;
  @Output() albumRemoved = new EventEmitter<Album>();

  removeAlbumItem() {
    this.albumRemoved.emit(this.album);
  }
}
