import companyFr from "./company/fr"
import moduleFr from "./module/fr"
import designationFr from "./Designation/fr"
import userRoleFr from "./UserRole/fr"
import userFr from "./User/fr"
import emailTempFr from "./EmailTemplate/fr"
import { moduleIds } from "../Components/constants/modulesIds"

const globalTrans = {
    'btn_submit': 'Envoyer',
    'btn_archive': 'Oui, archiver',
    'btn_activate': 'Oui, activer',
    'btn_close': 'Fermer',
    'btn_update_details': 'Mettre à jour les détails',
    'msg_well_done': 'Bien joué',
    'msg_no_data_available': 'Aucune donnée disponible',
    'msg_no_data_matched': 'Aucune donnée correspondante',
    'are_you_sure': 'Êtes-vous sûr',
    'view': 'Voir',
    'edit': 'Modifier',
    'add': 'Ajouter',
    'set_as_default': 'Définir comme par défaut',
    'archive': 'Archiver',
    're_activate': 'Réactiver',
    'search': 'Rechercher',
    'reset': 'Réinitialiser',
    'filter': 'Filtrer',
    'url': 'URL',
    'icon': 'Icône',
    'slug': 'Slug',
    'sort_order': 'Ordre de tri',
    'feature': 'Fonctionnalité',
    'created_at': 'Créé le',
    'updated_at': 'Mis à jour le',
    'action': 'Action',
    'default': 'Par défaut',
    'save': 'Enregistrer',
    'close': 'Fermer',
    'next': 'Suivant',
    'permission': 'Permission',
    'access_denied': 'Accès refusé. Veuillez contacter l\'administrateur de l\'entreprise',
    'go_to_dashboard': 'Accéder au tableau de bord',
    'title': 'Titre',
    'profile': 'Profil',
    'display_name': "Nom d'affichage",
    'full_name': 'Nom complet',
    'event': 'Événement',
    'subject': 'Sujet',

    'customizer': 'Personnalisateur',
    'layout': 'Mise en page',
    'choose_layout': 'Choisissez votre mise en page',
    'vertical': 'Vertical',
    'horizontal': 'Horizontal',
    'two_column': 'Deux colonnes',
    'semi_box': 'Demi-boîte',
    'color_scheme': 'Schéma de couleurs',
    'choose_color_scheme': 'Choisissez un schéma de couleurs clair ou sombre',
    'light': 'Clair',
    'dark': 'Sombre',
    'sidebar_visibility': 'Visibilité de la barre latérale',
    'choose_sidebar_visibility': 'Choisissez si la barre latérale doit être affichée ou masquée',
    'show': 'Afficher',
    'hidden': 'Masqué',
    'layout_width': 'Largeur de la mise en page',
    'choose_layout_width': 'Choisissez une mise en page fluide ou fixe',
    'fluid': 'Fluide',
    'boxed': 'Fixe',
    'layout_position': 'Position de la mise en page',
    'choose_layout_position': 'Choisissez si la mise en page doit être fixe ou défilante',
    'fixed': 'Fixe',
    'scrollable': 'Défilante',
    'top_color': 'Couleur de la barre supérieure',
    'choose_top_color': 'Choisissez une couleur claire ou sombre pour la barre supérieure',
    'sidebar_size': 'Taille de la barre latérale',
    'choose_sidebar_size': 'Choisissez la taille de la barre latérale',
    'compact': 'Compact',
    'icon_view': 'Vue icône (petite taille)',
    'hover_view': 'Vue survol (petite taille)',
    'sidebar_view': 'Vue de la barre latérale',
    'choose_sidebar_view': 'Choisissez la vue par défaut ou indépendante de la barre latérale',
    'detach': 'Détacher',
    'sidebar_color': 'Couleur de la barre latérale',
    'choose_sidebar_color': 'Choisissez une couleur claire ou sombre pour la barre latérale',
    'gradient': 'Dégradé',
    'sidebar_imgs': 'Images de la barre latérale',
    'choose_sidebar_imgs': 'Choisissez une image pour la barre latérale',
    'preloader': 'Préchargeur',
    'choose_preloader': 'Choisissez un préchargeur',
    'enable': 'Activer',
    'disable': 'Désactiver',

    // Validation
    'mandatory_feild': 'Ce champ est obligatoire',
    'min_8_required': 'Au moins 8 caractères sont requis',
    'pattren_mismatch': 'La saisie ne correspond pas au modèle',
};



const getFrTrans = (translations) => {

    let module_singular = 'Module';
    let module_plural = 'Modules';
    let user_role_singular = translations ? translations[`singular-${moduleIds?.user_role}-fr`] : '';
    let user_role_plural = translations ? translations[`plural-${moduleIds?.user_role}-fr`] : '';
    let user_singular = translations ? translations[`singular-${moduleIds?.user}-fr`] : '';
    let user_plural = translations ? translations[`plural-${moduleIds?.user}-fr`] : '';
    let designation_singular = translations ? translations[`singular-${moduleIds?.designation}-fr`] : '';
    let designation_plural = translations ? translations[`plural-${moduleIds?.designation}-fr`] : '';
    let company_singular = translations ? translations[`singular-${moduleIds?.company}-fr`] : '';
    let company_plural = translations ? translations[`plural-${moduleIds?.company}-fr`] : '';
    let email_temp_singular = translations ? translations[`singular-${moduleIds?.email_temp}-fr`] : '';
    let email_temp_plural = translations ? translations[`plural-${moduleIds?.email_temp}-fr`] : '';
    return {
        ...companyFr(company_singular, company_plural),
        ...moduleFr(module_singular, module_plural),
        ...designationFr(designation_singular, designation_plural),
        ...userRoleFr(user_role_singular, user_role_plural),
        ...userFr(user_singular, user_plural),
        ...emailTempFr(email_temp_singular, email_temp_plural),
        ...globalTrans
    }

}

export default getFrTrans