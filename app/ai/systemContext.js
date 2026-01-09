import { ngos } from '@/app/data/ngos';
import { donations } from '@/app/data/donations';

export function getSystemContext() {
  return {
    ngos,
    donations,
    totalDonation: donations.reduce((s, d) => s + d.amount, 0),
    ngoCount: ngos.length,
  };
}
