const designationDeTrans = (designation_singular, designation_plural) => {

    const designationDe = {
        'designation_singular': designation_singular,
        'designation_plural': designation_plural,
        'all_designation': designation_plural,
        'designation_add_btn': `Toevoegen ${designation_singular}`,
        'designation_page_title': `${designation_plural}`,
        'designation_edit_btn': `Bewerken ${designation_singular}`,
        'archive_designation_btn': `Archiveren ${designation_plural}`,
        'active_designation_btn': `Activeren ${designation_plural}`,

        //mesages
        'msg_designation_added_successfully': `${designation_singular} succesvol toegevoegd`,
        'msg_designation_updated_successfully': `${designation_singular} succesvol bijgewerkt`,
        'msg_sure_to_active_this_designation': `Weet u zeker dat u deze ${designation_singular} wilt activeren ? `,
        'msg_sure_to_archive_this_designation': `Weet u zeker dat u deze ${designation_singular} wilt archiveren ? `,
        'msg_designation_activated': `${designation_singular} succesvol geactiveerd`,
        'msg_designation_archived': `${designation_singular} succesvol gearchiveerd`,

        //label
        'label_designation_title': `${designation_singular} titel`,
        'label_add_designation': `Toevoegen ${designation_singular} `,
        'label_add_more_designation': `Voeg meer ${designation_singular} toe`,
        'label_designation_sort_order': `${designation_singular} sorteervolgorde`,
        'label_select_designation': `Selecteer ${designation_singular} `,

        //validation
        'invalid_designation_title': `Voer de ${designation_singular} in `,
        'invalid_designation_sort_order': `Voer de ${designation_singular} sorteervolgorde in `,

        //placeholder
        'placeholder_designation_title': `Voer de naam van ${designation_singular} in`,
    };

    return designationDe
}





export default designationDeTrans 