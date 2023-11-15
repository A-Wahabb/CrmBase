const designationItTrans = (designation_singular, designation_plural) => {

    const designationIt = {
        'designation_singular': designation_singular,
        'designation_plural': designation_plural,
        'all_designation': designation_plural,
        'designation_add_btn': `Aggiungi ${designation_singular}`,
        'designation_page_title': `${designation_plural}`,
        'designation_edit_btn': `Modifica ${designation_singular}`,
        'archive_designation_btn': `Archivia ${designation_plural}`,
        'active_designation_btn': `Attiva ${designation_plural}`,

        //mesages
        'msg_designation_added_successfully': `Il tuo ${designation_singular} è stato aggiunto correttamente`,
        'msg_designation_updated_successfully': `Il tuo ${designation_singular} è stato aggiornato correttamente`,
        'msg_sure_to_active_this_designation': `Sei sicuro di voler attivare questo ${designation_singular}?`,
        'msg_sure_to_archive_this_designation': `Sei sicuro di voler archiviare questo ${designation_singular}?`,
        'msg_designation_activated': `${designation_singular} attivato correttamente`,
        'msg_designation_archived': `${designation_singular} archiviato correttamente`,

        //label
        'label_designation_title': `Titolo ${designation_singular}`,
        'label_add_designation': `Aggiungi ${designation_singular}`,
        'label_add_more_designation': `Aggiungi altro ${designation_singular}`,
        'label_designation_sort_order': `Ordine di classificazione ${designation_singular}`,
        'label_select_designation': `Seleziona ${designation_singular}`,

        //validation
        'invalid_designation_title': `Inserisci ${designation_singular}`,
        'invalid_designation_sort_order': `Inserisci l'ordine di classificazione ${designation_singular}`,

        //placeholder
        'placeholder_designation_title': `Inserisci il nome di ${designation_singular}`,
    };


    return designationIt
}

export default designationItTrans 