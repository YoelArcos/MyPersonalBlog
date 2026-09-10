import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-cursor',
  standalone: false,
  
  templateUrl: './cursor.component.html',
  styleUrl: './cursor.component.css'
})
export class CursorComponent {
  cursorStyle = {
    left: '-50px',
    top: '-50px',
  };

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    this.cursorStyle.left = `${event.clientX}px`;
    this.cursorStyle.top = `${event.clientY}px`;
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
