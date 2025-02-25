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

export interface PaginatedResponse<T> {
    message: string;
    data: {
        data: T[];
        pagination: {
            current_page: number;
            per_page: number;
            total: number;
            last_page: number;
            prev_page: string | null;
            next_page: string | null;
        }
    }
}

export interface AttributesResponse extends PaginatedResponse<Attribute> {}
export interface AttributeValuesResponse extends PaginatedResponse<AttributeValue> {}