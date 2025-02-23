export interface Attribute {
    id: number;
    name: string;
    description?: string;
    created_at?: string;
    values?: AttributeValue[];
}

export interface AttributeValue {
    id: number;
    attribute_id: number;
    value: string;
}

export interface CreateAttributeDTO {
    name: string;
    description?: string;
}

export interface UpdateAttributeDTO {
    name?: string;
    description?: string;
}

export interface CreateAttributeValueDTO {
    attribute_id: number;
    value: string;
}

export interface UpdateAttributeValueDTO {
    value: string;
}