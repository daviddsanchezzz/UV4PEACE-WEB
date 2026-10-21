// Source of truth: WEB CLAUDE DESING/data/testimonials.json. Maps to the Phase 2 `testimonials` table.
import type { ImageRef } from './types';

export interface Testimonial {
  id: string;
  text: string;
  who: string;
  caption: string;
  photo: ImageRef;
  project: string;
  order: number;
  published: boolean;
  /** Shown in the Home "Voices from the stage" block when true. */
  home: boolean;
}

export const testimonials: Testimonial[] = [
  {
    id: 'gwim-1',
    text: 'This program is doing meaningful work for women and music. It was really empowering and inspiring to be part of this year’s event!',
    who: 'Female composer, Global Women in Music 2025',
    caption: '',
    photo: { src: '05-cita-compositora_IMG_5409.jpg', alt: 'Composer smiling on stage with the orchestra behind her', pos: '50% 35%' },
    project: 'global-women-in-music',
    order: 1,
    published: true,
    home: true,
  },
  {
    id: 'gwim-2',
    text: 'The invitation generated more than just an opportunity. It generated visibility, recognition, unity and for us, an unforgettable feeling of personal confidence that we will never forget. Music unites us all in a universal language and allows women to have that place of self worth.',
    who: 'Female conductors, Global Women in Music 2025',
    caption: 'Twin sister conductors Josefa and Esperanza Velasco, GWIM 2025',
    photo: { src: 'gwim-2025-hermanas-velasco.jpg', alt: 'Twin sister conductors Josefa and Esperanza Velasco', pos: '50% 50%' },
    project: 'global-women-in-music',
    order: 2,
    published: true,
    home: true,
  },
];
