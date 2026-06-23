export interface Testimonial {
  name: string;
  location: string;
  text: string;
  rating: number;
  source: 'Google';
}

export const testimonials: Testimonial[] = [
  {
    name: "Zara Bassett",
    location: "Google Review",
    text: "Really helpful at solving a problem and doing a beautiful job on replacing a slate roof which was badly leaking. Quick and efficient and excellent value for money, highly recommend.",
    rating: 5,
    source: 'Google',
  },
  {
    name: "Clare Jones",
    location: "Google Review",
    text: "Professional, reliable, perfectionist roofing company, you can't find better. A pleasure to do business with.",
    rating: 5,
    source: 'Google',
  },
  {
    name: "Simona Thompson",
    location: "Google Review",
    text: "Responsive, punctual, high quality work and excellent value. Could not fault them.",
    rating: 5,
    source: 'Google',
  },
];
