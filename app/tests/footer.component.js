import { Selector, t } from 'testcafe';
import { COMPONENT_IDS } from '../imports/ui/utilities/ComponentIDs';

class Footer {

  /* If someone is logged in, then log them out, otherwise do nothing. */
  async gotoAboutUsPage() {
    await Selector(`#${COMPONENT_IDS.FOOTER_ABOUT_US}`);
    await t.click(`#${COMPONENT_IDS.FOOTER_ABOUT_US}`);
  }
}

export const footer = new Footer();
