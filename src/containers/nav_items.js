import React, {useState} from 'react';
import ProfileMenu from '../components/nav_items/profile_menu'
import CsvDownloadMenu from '../components/nav_items/csv_download_menu'
import CsvUploadMenu from '../components/nav_items/csv_upload_menu'
import ParamColorMenu from '../components/nav_items/param_color_menu'
import LinkedParamsMenu from '../components/nav_items/linked_params_menu'

const NavItems  = ({ props }) => {
    const { showCsvDownloadMenu, showCsvUploadMenu, showColorSchemeMenu, showLinkedParamsMenu } = { ...props.menu };
    const [ showSettings, setShowSettings] = useState(false);

    if ( showCsvDownloadMenu ) {
        return <CsvDownloadMenu
            toggle={() => {
                props.toggleNavItem('csv_upload', !showCsvDownloadMenu);
                props.clearLoadError()
            }}
            isOpen={props.menu.showCsvDownloadMenu}
            profileData={props.profile}
            clearLoadError={props.clearLoadError}
            showCsvLoadSuccess={props.profile.showCsvLoadSuccess}
            getCsvDownload={props.getCsvDownload}
        />
    }
    if ( showCsvUploadMenu ) {
        return <CsvUploadMenu
            toggle={() => {
                props.toggleNavItem('csv_upload', !showCsvUploadMenu);
                props.clearLoadError();
            }}
            isOpen={props.menu.showCsvUploadMenu}
            profileData={props.profile}
            fetchProfileSummary={props.fetchProfileSummary}
            postCsvUpload={props.postCsvUpload}
            csvUploadConfirm={props.csvUploadConfirm}
            clearLoadError={props.clearLoadError}
            showCsvLoadSuccess={props.profile.showCsvLoadSuccess}
        />
    }
    if ( showLinkedParamsMenu ) {
        return <LinkedParamsMenu
            toggle={() => props.toggleNavItem('linked_params', !showLinkedParamsMenu)}
            isOpen={props.menu.showLinkedParamsMenu}
            summaryParams={props.summaryParams}
            postLinkedParamsEdit={props.postLinkedParamsEdit}
            updateSuccess={props.extras.profileUpdateSuccess}
            linkedParams={props.profile.linkedParams}
        />
    }
    if ( showColorSchemeMenu ) {
        return <ParamColorMenu
            toggle={() => props.toggleNavItem('interventions', !showColorSchemeMenu)}
            isOpen={props.menu.showColorSchemeMenu}
            unitInfo={props.unitInfo}
            postColorSchema={props.postColorSchema}
            updateSuccess={props.extras.profileUpdateSuccess}
        />
    }
    return <ProfileMenu
            toggle={() => {
                props.toggleNavItem('profile', !props.menu.showProfileMenu);
                setShowSettings(false)
            }}
            isOpen={props.menu.showProfileMenu}
            handleSave={props.updateProfileMenu}
            profileData={props.extras}
            setShowSettings={setShowSettings}
            showSettings={showSettings}
            postNewEmail={props.postNewEmail}
    />
};

export default NavItems