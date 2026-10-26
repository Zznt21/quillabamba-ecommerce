import {BETA_MODE, BETA_BLOCK_MESSAGE} from '../config/beta.js';

// Keep URL generation intact; gate only the external navigation boundary.
export function openWhatsApp(url, {betaMode = BETA_MODE, navigate = destination => window.location.assign(destination)} = {}) {
  if (betaMode) throw new Error(BETA_BLOCK_MESSAGE);
  navigate(url);
}
