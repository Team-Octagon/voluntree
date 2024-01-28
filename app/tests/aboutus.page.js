import { Selector, t } from 'testcafe';
import { PAGE_IDS } from '../imports/ui/utilities/PageIDs';

class AboutUsPage {
  constructor() {
    this.pageId = `#${PAGE_IDS.ABOUT_US}`;
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed() {
    await t.expect(this.pageSelector.exists).ok();
  }

}

export const aboutUsPage = new AboutUsPage();
