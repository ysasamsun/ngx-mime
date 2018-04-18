import { DebugElement } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';

import { SharedModule } from './../../shared/shared.module';
import { MimeViewerIntl } from './../../core/intl/viewer-intl';
import { MetadataComponent } from './metadata.component';
import { Manifest, Metadata } from './../../core/models/manifest';
import { IiifManifestService } from './../../core/iiif-manifest-service/iiif-manifest-service';
import { IiifManifestServiceStub } from '../../test/iiif-manifest-service-stub';

describe('MetadataComponent', () => {
  let component: MetadataComponent;
  let fixture: ComponentFixture<MetadataComponent>;
  let iiifManifestService: IiifManifestServiceStub;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, HttpClientModule],
      declarations: [MetadataComponent],
      providers: [MimeViewerIntl, { provide: IiifManifestService, useClass: IiifManifestServiceStub }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetadataComponent);
    component = fixture.componentInstance;
    iiifManifestService = TestBed.get(IiifManifestService);
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display metadata', () => {
    iiifManifestService._currentManifest.next(
      new Manifest({
        metadata: [new Metadata('label1', 'value1'), new Metadata('label2', 'value2')]
      })
    );
    fixture.detectChanges();

    const metadatas: DebugElement[] = fixture.debugElement.queryAll(By.css('.metadata'));
    expect(metadatas.length).toEqual(2);
  });

  it('should display attribution', () => {
    iiifManifestService._currentManifest.next(
      new Manifest({
        attribution: 'This is a test attribution'
      })
    );
    fixture.detectChanges();

    const attribution: DebugElement = fixture.debugElement.query(By.css('.attribution'));
    expect(attribution.nativeElement.innerText).toBe('This is a test attribution');
  });

  it('should display license', () => {
    iiifManifestService._currentManifest.next(
      new Manifest({
        license: 'https://wiki.creativecommons.org/wiki/CC0'
      })
    );
    fixture.detectChanges();

    const attribution: DebugElement = fixture.debugElement.query(By.css('.license'));
    expect(attribution.nativeElement.innerText).toBe('https://wiki.creativecommons.org/wiki/CC0');
  });

  it('should display logo', () => {
    iiifManifestService._currentManifest.next(
      new Manifest({
        logo: 'http://example.com/dummylogo.jpg'
      })
    );
    fixture.detectChanges();

    const attribution: DebugElement = fixture.debugElement.query(By.css('.logo'));
    expect(attribution.nativeElement.getAttribute('src')).toBe('http://example.com/dummylogo.jpg');
  });
});
