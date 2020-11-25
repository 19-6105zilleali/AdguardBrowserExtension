import browser from 'webextension-polyfill';
// TODO move log to the common directory
import { log } from '../../background/utils/log';

class Messenger {
    // eslint-disable-next-line class-methods-use-this
    async sendMessage(type, data) {
        log.debug('Request type:', type);
        if (data) {
            log.debug('Request data:', data);
        }

        const response = await browser.runtime.sendMessage({
            type,
            data,
        });

        if (response) {
            log.debug('Response type:', type);
            log.debug('Response data:', response);
        }

        return response;
    }

    createEventListener = async (events, callback) => {
        const eventListener = (...args) => {
            callback(...args);
        };

        let listenerId;
        const type = 'createEventListener';
        listenerId = await this.sendMessage(type, { events });

        browser.runtime.onMessage.addListener((message) => {
            if (message.type === 'notifyListeners') {
                const [type, data] = message.data;
                eventListener({ type, data });
            }
        });

        const onUnload = async () => {
            if (listenerId) {
                const type = 'removeListener';
                await this.sendMessage(type, { listenerId });
                listenerId = null;
            }
        };

        window.addEventListener('beforeunload', onUnload);
        window.addEventListener('unload', onUnload);

        return onUnload;
    };

    async getOptionsData() {
        return this.sendMessage('getOptionsData');
    }

    // eslint-disable-next-line class-methods-use-this
    async changeUserSetting(settingId, value) {
        // TODO refactor message handler to use common message format { type, data }
        await browser.runtime.sendMessage({
            type: 'changeUserSetting',
            key: settingId,
            value,
        });
    }

    openExtensionStore = async () => {
        const type = 'openExtensionStore';
        return this.sendMessage(type);
    }

    async enableFilter(filterId) {
        // TODO use common message types in constants;
        const type = 'addAndEnableFilter';
        return this.sendMessage(type, { filterId });
    }

    async disableFilter(filterId) {
        // TODO use common message types in constants;
        const type = 'disableAntiBannerFilter';
        return this.sendMessage(type, { filterId });
    }

    async applySettingsJson(json) {
        // TODO use common message types in the constants
        const type = 'applySettingsJson';
        return this.sendMessage(type, { json });
    }

    async openFilteringLog() {
        // TODO use common message types in the constants
        const type = 'openFilteringLog';
        return this.sendMessage(type);
    }

    async resetStatistics() {
        // TODO use common message types in the constants
        const type = 'resetBlockedAdsCount';
        return this.sendMessage(type);
    }

    async getUserRules() {
        // TODO use common message types in the constants
        const type = 'getUserRules';
        return this.sendMessage(type);
    }

    async saveUserRules(value) {
        // TODO use common message types in the constants
        const type = 'saveUserRules';
        await this.sendMessage(type, { value });
    }

    async getAllowlist() {
        const type = 'getWhitelistDomains';
        return this.sendMessage(type);
    }

    async saveAllowlist(value) {
        // TODO use common message types in the constants
        const type = 'saveWhitelistDomains';
        await this.sendMessage(type, { value });
    }

    async updateFilters(filters) {
        // TODO use common message types in the constants
        const type = 'checkAntiBannerFiltersUpdate';
        return this.sendMessage(type, { filters });
    }

    async updateGroupStatus(id, data) {
        // TODO use common message types in the constants
        const type = data ? 'enableFiltersGroup' : 'disableFiltersGroup';
        const groupId = id - 0;
        await this.sendMessage(type, { groupId });
    }

    async updateFilterStatus(filterId, data) {
        // TODO use common message types in constants;
        const type = data ? 'addAndEnableFilter' : 'disableAntiBannerFilter';
        await this.sendMessage(type, { filterId });
    }

    async checkCustomUrl(url) {
        // TODO use common message types in the constants
        const type = 'loadCustomFilterInfo';
        return this.sendMessage(type, { url });
    }

    async addCustomFilter(filter) {
        // TODO use common message types in the constants
        const type = 'subscribeToCustomFilter';
        return this.sendMessage(type, { filter });
    }

    async removeCustomFilter(filterId) {
        // TODO use common message types in the constants
        const type = 'removeAntiBannerFilter';
        await this.sendMessage(type, { filterId });
    }

    async getTabInfoForPopup(tabId) {
        const type = 'getTabInfoForPopup';
        return this.sendMessage(type, { tabId });
    }

    async changeApplicationFilteringDisabled(state) {
        const type = 'changeApplicationFilteringDisabled';
        return this.sendMessage(type, { state });
    }

    async openSettingsTab() {
        const type = 'openSettingsTab';
        return this.sendMessage(type);
    }

    async openAssistant() {
        const type = 'openAssistant';
        return this.sendMessage(type);
    }

    async openAbuseSite(url) {
        const type = 'openAbuseTab';
        return this.sendMessage(type, { url });
    }

    async checkSiteSecurity() {
        const type = 'openSiteReportTab';
        return this.sendMessage(type);
    }

    async removeAllowlistDomain() {
        const type = 'removeAllowlistDomainPopup';
        return this.sendMessage(type);
    }

    async addAllowlistDomain(url) {
        const type = 'addAllowlistDomainPopup';
        return this.sendMessage(type, { url });
    }
}

const messenger = new Messenger();

export { messenger };
