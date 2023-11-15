import { Label } from "reactstrap";

import { useTranslation } from 'react-i18next';
const AddCompanyStep2 = ({ formData, allError, handleChange, handleInvalid, AddRemoveDesignation, props }) => {
    const { t } = useTranslation();

    return (
        <>
            {formData.Company_Designations.map((x, index) => (
                <>
                    <div className="col-11 col-md-6 mb-3">
                        <Label htmlFor="Designation_Name" className="form-label">{t('label_designation_name')}</Label>
                        <input
                            name={x.id}
                            className="form-control"
                            placeholder={t('placeholder_designation_name')}
                            type="text"
                            onInvalid={handleInvalid}
                            maxLength={100}
                            required
                            onChange={handleChange}
                            // onBlur={handleBlur}
                            value={x.D_Name}
                        />
                        <div className="invalid-feedback">{t(allError?.hasProperty(x.id) ? allError[x.id] : '') || t('invalid_designation')}</div>
                        {/* {validation.touched.Designation_Name && validation.errors.Designation_Name ? (
                <FormFeedback type="invalid">{validation.errors.Designation_Name}</FormFeedback>
              ) : null} */}
                    </div>
                    <div className="col-1 d-flex justify-content-center align-items-center">
                        {index !== 0 && <i className="ri-close-line fs-x-large text-danger" onClick={() => AddRemoveDesignation('Rmv', x.id)}></i>}
                    </div>
                </>
            ))}
            <div className="col-12">
                <p className="w-fitContent" onClick={() => AddRemoveDesignation('Add')}>+ {t('label_add_more_designation')}</p>
            </div>
        </>
    );
}

export default AddCompanyStep2;