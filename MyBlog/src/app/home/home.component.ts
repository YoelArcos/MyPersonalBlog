import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  

  safeContent: SafeHtml | null = null;

  constructor(private translate: TranslateService, private sanitizer: DomSanitizer) {
    this.translate.setDefaultLang('en');

    this.translate.get('about.paragraph3').subscribe((content: string) => {
      this.safeContent = this.sanitizer.bypassSecurityTrustHtml(content);
    });
  }
    switchLanguage(language: string) {
      this.translate.use(language);

      this.translate.get('about.paragraph3').subscribe((content: string) => {
        this.safeContent = this.sanitizer.bypassSecurityTrustHtml(content);
      });
    }
  }

