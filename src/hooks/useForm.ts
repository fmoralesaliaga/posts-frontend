import { useState } from 'react';

type ValidationRules<T> = {
  [K in keyof T]?: (value: T[K], formData: T) => string | null;
};

type ValidationErrors<T> = {
  [K in keyof T]?: string;
};

/**
 * Hook personalizado para validación de formularios
 * @param initialValues - Valores iniciales del formulario
 * @param validationRules - Reglas de validación
 * @returns - Métodos y propiedades para manejar el formulario
 */
export function useForm<T extends Record<string, any>>(
  initialValues: T,
  validationRules: ValidationRules<T> = {}
) {
  const [formData, setFormData] = useState<T>(initialValues);
  const [errors, setErrors] = useState<ValidationErrors<T>>({});
  const [touched, setTouched] = useState<Record<keyof T, boolean>>({} as Record<keyof T, boolean>);

  // Manejar cambios en los campos del formulario
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Validar campo cuando cambia
    if (validationRules[name as keyof T] && touched[name as keyof T]) {
      const fieldError = validationRules[name as keyof T]!(value as any, formData);
      setErrors(prev => ({
        ...prev,
        [name]: fieldError,
      }));
    }
  };

  // Marcar un campo como tocado cuando pierde el foco
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name } = e.target;
    
    setTouched(prev => ({
      ...prev,
      [name]: true,
    }));

    if (validationRules[name as keyof T]) {
      const fieldError = validationRules[name as keyof T]!(formData[name as keyof T], formData);
      setErrors(prev => ({
        ...prev,
        [name]: fieldError,
      }));
    }
  };

  // Validar todos los campos
  const validateForm = (): boolean => {
    const newErrors: ValidationErrors<T> = {};
    let isValid = true;

    // Validar cada campo con las reglas proporcionadas
    Object.keys(validationRules).forEach(key => {
      const fieldName = key as keyof T;
      const validateField = validationRules[fieldName]!;
      const errorMessage = validateField(formData[fieldName], formData);
      
      if (errorMessage) {
        newErrors[fieldName] = errorMessage;
        isValid = false;
      }
    });

    setErrors(newErrors);
    
    // Marcar todos los campos como tocados
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key as keyof T] = true;
      return acc;
    }, {} as Record<keyof T, boolean>);
    
    setTouched(allTouched);

    return isValid;
  };

  // Resetear el formulario
  const resetForm = () => {
    setFormData(initialValues);
    setErrors({});
    setTouched({} as Record<keyof T, boolean>);
  };

  // Establecer los valores del formulario (útil para edición)
  const setValues = (values: Partial<T>) => {
    setFormData(prev => ({
      ...prev,
      ...values,
    }));
  };

  return {
    formData,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateForm,
    resetForm,
    setValues,
  };
}
