import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, OnDestroy, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  private revealObserver?: IntersectionObserver;
  @ViewChild('menuToggle') menuToggle?: ElementRef<HTMLButtonElement>;
  menuOpen = false;
  currentLanguage = 'en';
  safeContent: SafeHtml | null = null;

  constructor(private translate: TranslateService, private sanitizer: DomSanitizer,
    @Inject(DOCUMENT) private document: Document, private changeDetector: ChangeDetectorRef) {
    this.translate.setDefaultLang('en');
    this.updateAboutContent();
  }

  closeMenu(restoreFocus = false): void {
    this.menuOpen = false;
    // Collapse the header before the browser calculates an anchor scroll target.
    this.changeDetector.detectChanges();
    if (restoreFocus) this.menuToggle?.nativeElement.focus();
  }

  ngAfterViewInit(): void {
    const view = this.document.defaultView;
    if (!view || !('IntersectionObserver' in view) || view.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // Content stays visible even if observers or animations are unavailable.
    this.revealObserver = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          this.revealObserver?.unobserve(entry.target);
        }
      }
    }, { threshold: .08 });
    this.document.querySelectorAll('.title, .project-card, .language-card, .contact-form, .content-div')
      .forEach(element => this.revealObserver?.observe(element));
  }

  ngOnDestroy(): void {
    this.revealObserver?.disconnect();
  }

  switchLanguage(language: string): void {
    this.translate.use(language).subscribe(() => {
      this.currentLanguage = language;
      this.document.documentElement.lang = language;
      this.updateAboutContent();
    });
  }

  private updateAboutContent(): void {
    this.translate.get('about.paragraph3').subscribe((content: string) => {
      this.safeContent = this.sanitizer.bypassSecurityTrustHtml(content);
    });
  }
}

