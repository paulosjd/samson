import React from 'react';
import ProfileMenu from '../components/nav_items/profile_menu'
import CsvDownloadMenu from '../components/nav_items/csv_download_menu'
import CsvUploadMenu from '../components/nav_items/csv_upload_menu'
import ParamColorMenu from '../components/nav_items/param_color_menu'

const NavItems  = ({ props }) => {
    const { showCsvDownloadMenu, showCsvUploadMenu, showColorSchemeMenu } = { ...props.menu };
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
    if ( showColorSchemeMenu ) {
        return <ParamColorMenu
            toggle={() => props.toggleNavItem('interventions', !showColorSchemeMenu)}
            isOpen={props.menu.showColorSchemeMenu}
            blankItems={props.blankItems}
            unitInfo={props.unitInfo}
            postColorSchema={props.postColorSchema}
            updateSuccess={props.extras.profileUpdateSuccess}
        />
    }
    return <ProfileMenu
            toggle={() => props.toggleNavItem('profile', !props.menu.showProfileMenu)}
            isOpen={props.menu.showProfileMenu}
            username={props.username}
            handleSave={props.updateProfileMenu}
            profileData={props.extras}
            targetDataRefresh={props.targetDataRefresh}
        />
};

export default NavItems