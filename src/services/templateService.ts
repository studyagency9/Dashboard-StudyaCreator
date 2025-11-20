import apiClient from './apiClient';

// On pourrait définir une interface Template ici pour plus de robustesse
// export interface Template { ... }

export const createTemplate = async (templateData: any) => {
  try {
    const response = await apiClient.post('/templates', templateData);
    return response.data;
  } catch (error) {
    // Ici, on peut gérer l'erreur plus finement avant de la renvoyer
    console.error('Error in createTemplate service:', error);
    throw error;
  }
};

export const getAllTemplates = async () => {
  try {
    const response = await apiClient.get('/templates');
    return response.data;
  } catch (error) {
    console.error('Error in getAllTemplates service:', error);
    throw error;
  }
};

export const deleteTemplate = async (_id: string) => {
  try {
    const response = await apiClient.delete(`/templates/${_id}`);
    return response.data;
  } catch (error) {
    console.error(`Error in deleteTemplate service for _id ${_id}:`, error);
    throw error;
  }
};

// ... autres fonctions du service (getById, update, delete)
