
export class TokenModel {

    token_type: String;
    expires_in: Number;
    access_token: String;
    refresh_token: String;
    context_user: String;

    deserialize(input) {
        Object.assign(this, input);
        return this;
    }
}
