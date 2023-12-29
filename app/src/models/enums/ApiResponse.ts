/* eslint-disable @typescript-eslint/naming-convention */
enum ResponseCode {
    OK = 'OK',
    UNKNOWN = 'UNKNOWN',
    INVALID_ARGUMENT = 'INVALID_ARGUMENT',
    BAD_REQUEST = 'BAD_REQUEST',
    DEADLINE_EXCEEDED = 'DEADLINE_EXCEEDED',
    NOT_FOUND = 'NOT_FOUND',
    ALREADY_EXISTS = 'ALREADY_EXISTS',
    PERMISSION_DENIED = 'PERMISSION_DENIED',
    RESOURCE_EXHAUSTED = 'RESOURCE_EXHAUSTED',
    UNIMPLEMENTED = 'UNIMPLEMENTED',
    INTERNAL = 'INTERNAL',
    UNAVAILABLE = 'UNAVAILABLE',
    UNAUTHENTICATED = 'UNAUTHENTICATED',
}

enum ResponseCodeNO {
    OK = 0,
    BAD_REQUEST = 1,
    UNKNOWN = 2,
    INVALID_ARGUMENT = 3,
    DEADLINE_EXCEEDED = 4,
    NOT_FOUND = 5,
    ALREADY_EXISTS = 6,
    PERMISSION_DENIED = 7,
    RESOURCE_EXHAUSTED = 8,
    UNIMPLEMENTED = 12,
    INTERNAL = 13,
    UNAVAILABLE = 14,
    UNAUTHENTICATED = 16,
}

import httpStatus, { HttpStatus } from 'http-status';

interface ResponseEntry {
    code: ResponseCode;
    codeNO: ResponseCodeNO;
    message: string;
    httpStatus: number;
}

const apiResponses: Record<string, ResponseEntry> = {
    OK: {
        code: ResponseCode.OK,
        codeNO: ResponseCodeNO.OK,
        message: '操作成功',
        httpStatus: httpStatus.OK,
    },
    BAD_REQUEST: {
        code: ResponseCode.BAD_REQUEST,
        codeNO: ResponseCodeNO.BAD_REQUEST,
        message: '请求失败',
        httpStatus: httpStatus.BAD_REQUEST,
    },
    UNKNOWN: {
        code: ResponseCode.UNKNOWN,
        codeNO: ResponseCodeNO.UNKNOWN,
        message: '未知錯誤',
        httpStatus: httpStatus.INTERNAL_SERVER_ERROR,
    },
    INVALID_ARGUMENT: {
        code: ResponseCode.INVALID_ARGUMENT,
        codeNO: ResponseCodeNO.INVALID_ARGUMENT,
        message: '解析參數錯誤',
        httpStatus: httpStatus.BAD_REQUEST,
    },
    DEADLINE_EXCEEDED: {
        code: ResponseCode.DEADLINE_EXCEEDED,
        codeNO: ResponseCodeNO.DEADLINE_EXCEEDED,
        message: '操作超時',
        httpStatus: httpStatus.GATEWAY_TIMEOUT,
    },
    NOT_FOUND: {
        code: ResponseCode.NOT_FOUND,
        codeNO: ResponseCodeNO.NOT_FOUND,
        message: '找不到請求資源',
        httpStatus: httpStatus.NOT_FOUND,
    },
    ALREADY_EXISTS: {
        code: ResponseCode.ALREADY_EXISTS,
        codeNO: ResponseCodeNO.ALREADY_EXISTS,
        message: '資料已存在',
        httpStatus: httpStatus.CONFLICT,
    },
    PERMISSION_DENIED: {
        code: ResponseCode.PERMISSION_DENIED,
        codeNO: ResponseCodeNO.PERMISSION_DENIED,
        message: '資料權限不足',
        httpStatus: httpStatus.FORBIDDEN,
    },
    RESOURCE_EXHAUSTED: {
        code: ResponseCode.RESOURCE_EXHAUSTED,
        codeNO: ResponseCodeNO.RESOURCE_EXHAUSTED,
        message: '請求出過限制',
        httpStatus: httpStatus.TOO_MANY_REQUESTS,
    },
    UNIMPLEMENTED: {
        code: ResponseCode.UNIMPLEMENTED,
        codeNO: ResponseCodeNO.UNIMPLEMENTED,
        message: '未實作',
        httpStatus: httpStatus.NOT_IMPLEMENTED,
    },
    INTERNAL: {
        code: ResponseCode.INTERNAL,
        codeNO: ResponseCodeNO.INTERNAL,
        message: '系統內部錯誤',
        httpStatus: httpStatus.INTERNAL_SERVER_ERROR,
    },
    UNAVAILABLE: {
        code: ResponseCode.UNAVAILABLE,
        codeNO: ResponseCodeNO.UNAVAILABLE,
        message: '無法獲取服務',
        httpStatus: httpStatus.SERVICE_UNAVAILABLE,
    },
    UNAUTHENTICATED: {
        code: ResponseCode.UNAUTHENTICATED,
        codeNO: ResponseCodeNO.UNAUTHENTICATED,
        message: '驗證已失效',
        httpStatus: httpStatus.UNAUTHORIZED,
    },
};

export { HttpStatus, ResponseCode, ResponseEntry, apiResponses };
