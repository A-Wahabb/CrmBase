const userRoleItTrans = (user_role_singular, user_role_plural) => {

    const userRoleIt = {
        'user_role_singular': user_role_singular,
        'user_role_plural': user_role_plural,
        'all_user_role': user_role_plural,
        'user_role_add_btn': `Aggiungi ${user_role_singular}`,
        'user_role_page_title': `${user_role_plural}`,
        'user_role_edit_btn': `Modifica ${user_role_singular}`,
        'archive_user_role_btn': `Archivia ${user_role_plural}`,
        'active_user_role_btn': `Attiva ${user_role_plural}`,
        'user_role_edit_permissions_btn': `Modifica permessi di ${user_role_plural}`,

        //messaggi
        'msg_user_role_added_successfully': `Il ${user_role_singular} è stato aggiunto correttamente`,
        'msg_user_role_updated_successfully': `Il ${user_role_singular} è stato aggiornato correttamente`,
        'msg_user_role_permission_updated_successfully': `I permessi del ${user_role_singular} sono stati aggiornati correttamente`,
        'msg_sure_to_active_this_user_role': `Sei sicuro/a di voler attivare questo ${user_role_singular}?`,
        'msg_sure_to_archive_this_user_role': `Sei sicuro/a di voler archiviare questo ${user_role_singular}?`,
        'msg_user_role_activated': `${user_role_singular} attivato correttamente`,
        'msg_user_role_archived': `${user_role_singular} archiviato correttamente`,

        //etichetta
        'label_user_role_title': `Titolo ${user_role_singular}`,
        'label_add_user_role': `Aggiungi ${user_role_singular}`,
        'label_add_more_user_role': `Aggiungi altri ${user_role_plural}`,
        'label_user_role_description': `Descrizione ${user_role_singular}`,
        'label_select_user_role': `Seleziona ${user_role_singular}`,

        //validazione
        'invalid_user_role_title': `Inserisci il titolo ${user_role_singular}`,
        'invalid_user_role_description': `Inserisci la descrizione ${user_role_singular}`,
        'invalid_user_role': `Seleziona ${user_role_singular}`,

        //spazio vuoto
        'placeholder_user_role_title': `Inserisci il nome ${user_role_singular}`,
    };


    return userRoleIt
}

export default userRoleItTrans 