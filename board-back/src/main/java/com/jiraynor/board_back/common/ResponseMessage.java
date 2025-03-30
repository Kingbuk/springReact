package com.jiraynor.board_back.common;

public interface ResponseMessage {

    // HTTP Status 200
    public static final String SUCCESS = "Success";

    // HTTP Status 400
    public static final String VALIDATION_FAILED = "Validation faild";
    public static final String DUPLICATE_FAILED = "Duplicate email";
    public static final String DUPLICATE_NICKNAME = "Duplicate nickname";
    public static final String DUPLICATE_TEL_NUMBER = "Duplicate tel number";
    public static final String NOT_EXISTED_USER = "This user does not exist";
    public static final String NOT_EXISTED_BOARD = "This board does";

    // HTTP Status 401
    String SIGN_IN_FAIL = "Login information dismatch";
    String AUTHORIZATION_FAIL = "Authorization Failed";

    // HTTP Status 403
    String NO_PERMISSION = "Do not have permission";
    // HTTP Status 500
    String DATABASE_ERROR = "Database error";

}
