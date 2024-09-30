/* tslint:disable */
/* eslint-disable */
// Generated using typescript-generator version 3.2.1263 on 2024-09-29 21:24:30.

export interface CertificateDto {
    id: number;
    supplierId: number;
    certificateType: CertificateType;
    validFrom: Date;
    validTo: Date;
    pdfUrl: string;
    assignedUserIds: number[];
    comments: string[];
}

export interface DepartmentDto {
    id: number;
    code: string;
    name: string;
}

export interface SupplierDto {
    id: number;
    name: string;
    city: string;
    certificateIds: number[];
}

export interface CommentDto {
    id: number;
    certificateId: number;
    userId: number;
    content: string;
}

export interface UserDto {
    id: number;
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    departmentId: number;
    plant: string;
    assignedCertificateIds: number[];
    commentIds: number[];
}

export type CertificateType = "PERMISSION_OF_PRINTING" | "CCC_CERTIFICATE";
