import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-cursor',
  standalone: false,
  
  templateUrl: './cursor.component.html',
  styleUrl: './cursor.component.css'
})
export class CursorComponent {
  cursorStyle = {
    left: '0px',
    top: '0px',
  };

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    this.cursorStyle.left = `${event.pageX}px`;
    this.cursorStyle.top = `${event.pageY}px`;
  }

  @HostListener('mouseover', ['$event.target'])
  onMouseOver(target: HTMLElement): void {
    if (target.tagName === 'A' || target.tagName === 'BUTTON') {
      document.getElementById('cursor')?.classList.add('hover');
    }
  }

  @HostListener('mouseout', ['$event.target'])
  onMouseOut(target: HTMLElement): void {
    if (target.tagName === 'A' || target.tagName === 'BUTTON') {
      document.getElementById('cursor')?.classList.remove('hover');
    }
  }

}


