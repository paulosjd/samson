import React from 'react';
import ProfileMenu from '../components/navbar_items/profile_menu'
import CsvDownloadMenu from '../components/navbar_items/csv_download_menu'
import CsvUploadMenu from '../components/navbar_items/csv_upload_menu'
import InterventionsMenu from '../components/navbar_items/interventions_menu'

const NavItems  = ({ props }) => {

    const { showCsvDownloadMenu, showCsvUploadMenu, showInterventionsMenu } = { ...props.menu };

    if ( showCsvDownloadMenu ) {
        return <CsvDownloadMenu
            toggle={() => props.toggleNavItem('csv_upload', !showCsvDownloadMenu)}
            isOpen={props.menu.showCsvDownloadMenu}
            profileData={props.extras}
        />
    }
    if ( showCsvUploadMenu ) {
        return <CsvUploadMenu
            toggle={() => props.toggleNavItem('csv_upload', !showCsvUploadMenu)}
            isOpen={props.menu.showCsvUploadMenu}
            profileData={props.profile}
            postCsvUpload={props.postCsvUpload}
        />
    }
    if ( showInterventionsMenu ) {
        return <InterventionsMenu
            toggle={() => props.toggleNavItem('interventions', !showInterventionsMenu)}
            isOpen={props.menu.showInterventionsMenu}
            profileData={props.extras}
        />
    }
    return <ProfileMenu
            toggle={() => props.toggleNavItem('profile', !props.menu.showProfileMenu)}
            isOpen={props.menu.showProfileMenu}
            username={props.username}
            handleSave={props.updateProfileMenu}
            profileData={props.extras}
        />

};

export default NavItems