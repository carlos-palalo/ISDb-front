import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-modal-video',
  templateUrl: './modal-video.component.html',
  styleUrls: ['./modal-video.component.css']
})

export class ModalVideoComponent {
  @Input() urlVideo: string;
  constructor(private modal: NgbModal, private sanitizer: DomSanitizer) { }
  public open(contenido) {
    this.modal.open(contenido, {
      centered: true
    });
    console.log(this.urlVideo);
  }

  sanitizeVideoUrl() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.urlVideo + "?autoplay=false&width=500");
  }
}
