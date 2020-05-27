import React, { useContext } from 'react';
import { observer } from 'mobx-react';
import SettingsSection from '../Settings/SettingsSection';
import SettingsSet from '../Settings/SettingsSet';
import Setting, { SETTINGS_TYPES } from '../Settings/Setting';
import rootStore from '../../stores';
import i18n from '../../../../services/i18n';

// TODO move into helpers
const hoursToMs = (hours) => {
    const MS_IN_HOUR = 1000 * 60 * 60;
    return hours * MS_IN_HOUR;
};

const filtersUpdatePeriodOptions = [
    {
        value: -1,
        title: i18n.translate('options_select_update_period_default'),
    },
    {
        value: hoursToMs(48),
        title: i18n.translate('options_select_update_period_48h'),
    },
    {
        value: hoursToMs(24),
        title: i18n.translate('options_select_update_period_24h'),
    },
    {
        value: hoursToMs(12),
        title: i18n.translate('options_select_update_period_12h'),
    },
    {
        value: hoursToMs(6),
        title: i18n.translate('options_select_update_period_6h'),
    },
    {
        value: hoursToMs(1),
        title: i18n.translate('options_select_update_period_1h'),
    },
    {
        value: 0,
        title: i18n.translate('options_select_update_period_disabled'),
    },
];

const ALLOW_ACCEPTABLE_ADS = 'allowAcceptableAds';

const General = observer(() => {
    const {
        settingsStore,
    } = useContext(rootStore);

    const { settings, allowAcceptableAds } = settingsStore;

    if (!settings) {
        return null;
    }

    const handleImportSettings = async () => {
        // TODO
    };

    const handleExportSettings = async () => {
        // TODO
    };

    const allowAcceptableAdsChangeHandler = async ({ data }) => {
        await settingsStore.setAllowAcceptableAdsValue(data);
    };

    const settingChangeHandler = async ({ id, data }) => {
        await settingsStore.updateSetting(id, data);
    };

    const {
        DISABLE_DETECT_FILTERS,
        FILTERS_UPDATE_PERIOD,
        DISABLE_SAFEBROWSING,
    } = settings.names;

    // eslint-disable-next-line max-len
    const ALLOW_ACCEPTABLE_ADS_LEARN_MORE_URL = 'https://adguard.com/forward.html?action=self_promotion&from=options_screen&app=browser_extension';

    // eslint-disable-next-line max-len
    const SAFEBROWSING_LEARN_MORE_URL = 'https://adguard.com/forward.html?action=protection_works&from=options_screen&app=browser_extension';

    return (
        <>
            <h2 className="title">Settings</h2>
            <SettingsSection
                title={i18n.translate('context_general_settings')}
            >
                <SettingsSet
                    title={i18n.translate('options_allow_acceptable_ads')}
                    description={(
                        <a
                            href={ALLOW_ACCEPTABLE_ADS_LEARN_MORE_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {i18n.translate('options_learn_more')}
                        </a>
                    )}
                >
                    <Setting
                        id={ALLOW_ACCEPTABLE_ADS}
                        type={SETTINGS_TYPES.CHECKBOX}
                        value={allowAcceptableAds}
                        handler={allowAcceptableAdsChangeHandler}
                    />
                </SettingsSet>
                <SettingsSet
                    title={i18n.translate('options_safebrowsing_enabled')}
                    description={(
                        <a
                            href={SAFEBROWSING_LEARN_MORE_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {i18n.translate('options_learn_more')}
                        </a>
                    )}
                >
                    <Setting
                        id={DISABLE_SAFEBROWSING}
                        type={SETTINGS_TYPES.CHECKBOX}
                        inverted
                        value={settings.values[DISABLE_SAFEBROWSING]}
                        handler={settingChangeHandler}
                    />
                </SettingsSet>
                <SettingsSet
                    title={i18n.translate('options_enable_autodetect_filter')}
                >
                    <Setting
                        id={DISABLE_DETECT_FILTERS}
                        type={SETTINGS_TYPES.CHECKBOX}
                        inverted
                        handler={settingChangeHandler}
                        value={settings.values[DISABLE_DETECT_FILTERS]}
                    />
                </SettingsSet>
                <SettingsSet
                    title={i18n.translate('options_set_update_interval')}
                >
                    <Setting
                        id={FILTERS_UPDATE_PERIOD}
                        type={SETTINGS_TYPES.SELECT}
                        options={filtersUpdatePeriodOptions}
                        value={settings.values[FILTERS_UPDATE_PERIOD]}
                        handler={settingChangeHandler}
                    />
                </SettingsSet>
            </SettingsSection>
            <button
                type="button"
                className="button button--m button--green content__btn"
                onClick={handleExportSettings}
            >
                {i18n.translate('options_export_settings')}
            </button>
            <button
                type="button"
                className="button button--m button--green-bd content__btn"
                onClick={handleImportSettings}
            >
                {i18n.translate('options_import_settings')}
            </button>
        </>
    );
});

export default General;
