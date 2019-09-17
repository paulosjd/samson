import React from 'react';
import ProfileMenu from '../components/nav_items/profile_menu'
import CsvDownloadMenu from '../components/nav_items/csv_download_menu'
import CsvUploadMenu from '../components/nav_items/csv_upload_menu'
import ColorSchemeMenu from '../components/nav_items/color_schema_menu'

const NavItems  = ({ props }) => {
    const { showCsvDownloadMenu, showCsvUploadMenu, showColorSchemeMenu } = { ...props.menu };
    if ( showCsvDownloadMenu ) {
        return <CsvDownloadMenu
            toggle={() => {
                props.toggleNavItem('csv_upload', !showCsvDownloadMenu);
                props.clearCsvLoad()
            }}
            isOpen={props.menu.showCsvDownloadMenu}
            profileData={props.profile}
            clearCsvLoad={props.clearCsvLoad}
            showCsvLoadSuccess={props.profile.showCsvLoadSuccess}
            getCsvDownload={props.getCsvDownload}
        />
    }
    if ( showCsvUploadMenu ) {
        return <CsvUploadMenu
            toggle={() => {
                props.toggleNavItem('csv_upload', !showCsvUploadMenu);
                props.clearCsvLoad();
            }}
            isOpen={props.menu.showCsvUploadMenu}
            profileData={props.profile}
            fetchProfileSummary={props.fetchProfileSummary}
            postCsvUpload={props.postCsvUpload}
            csvUploadConfirm={props.csvUploadConfirm}
            clearCsvLoad={props.clearCsvLoad}
            showCsvLoadSuccess={props.profile.showCsvLoadSuccess}
        />
    }
    if ( showColorSchemeMenu ) {
        return <ColorSchemeMenu
            toggle={() => props.toggleNavItem('interventions', !showColorSchemeMenu)}
            isOpen={props.menu.showColorSchemeMenu}
            summaryItems={props.summaryItems}
            blankItems={props.blankItems}
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