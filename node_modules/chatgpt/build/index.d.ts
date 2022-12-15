import ExpiryMap from 'expiry-map';
import { Protocol, Browser, PuppeteerLaunchOptions } from 'puppeteer';

type ContentType = 'text';
type Role = 'user' | 'assistant';
/**
 * https://chat.openapi.com/api/auth/session
 */
type SessionResult = {
    /**
     * Authenticated user
     */
    user: User;
    /**
     * ISO date of the expiration date of the access token
     */
    expires: string;
    /**
     * The access token
     */
    accessToken: string;
    /**
     * If there was an error associated with this request
     */
    error?: string | null;
};
type User = {
    /**
     * ID of the user
     */
    id: string;
    /**
     * Name of the user
     */
    name: string;
    /**
     * Email of the user
     */
    email?: string;
    /**
     * Image of the user
     */
    image: string;
    /**
     * Picture of the user
     */
    picture: string;
    /**
     * Groups the user is in
     */
    groups: string[];
    /**
     * Features the user is in
     */
    features: string[];
};
/**
 * https://chat.openapi.com/backend-api/models
 */
type ModelsResult = {
    /**
     * Array of models
     */
    models: Model[];
};
type Model = {
    /**
     * Name of the model
     */
    slug: string;
    /**
     * Max tokens of the model
     */
    max_tokens: number;
    /**
     * Whether or not the model is special
     */
    is_special: boolean;
};
/**
 * https://chat.openapi.com/backend-api/moderations
 */
type ModerationsJSONBody = {
    /**
     * Input for the moderation decision
     */
    input: string;
    /**
     * The model to use in the decision
     */
    model: AvailableModerationModels;
};
type AvailableModerationModels = 'text-moderation-playground';
/**
 * https://chat.openapi.com/backend-api/moderations
 */
type ModerationsJSONResult = {
    /**
     * Whether or not the input is flagged
     */
    flagged: boolean;
    /**
     * Whether or not the input is blocked
     */
    blocked: boolean;
    /**
     * The ID of the decision
     */
    moderation_id: string;
};
/**
 * https://chat.openapi.com/backend-api/conversation
 */
type ConversationJSONBody = {
    /**
     * The action to take
     */
    action: string;
    /**
     * The ID of the conversation
     */
    conversation_id?: string;
    /**
     * Prompts to provide
     */
    messages: Prompt[];
    /**
     * The model to use
     */
    model: string;
    /**
     * The parent message ID
     */
    parent_message_id: string;
};
type Prompt = {
    /**
     * The content of the prompt
     */
    content: PromptContent;
    /**
     * The ID of the prompt
     */
    id: string;
    /**
     * The role played in the prompt
     */
    role: Role;
};
type PromptContent = {
    /**
     * The content type of the prompt
     */
    content_type: ContentType;
    /**
     * The parts to the prompt
     */
    parts: string[];
};
/**
 * https://chat.openapi.com/backend-api/conversation/message_feedback
 */
type MessageFeedbackJSONBody = {
    /**
     * The ID of the conversation
     */
    conversation_id: string;
    /**
     * The message ID
     */
    message_id: string;
    /**
     * The rating
     */
    rating: MessageFeedbackRating;
    /**
     * Tags to give the rating
     */
    tags?: MessageFeedbackTags[];
    /**
     * The text to include
     */
    text?: string;
};
type MessageFeedbackTags = 'harmful' | 'false' | 'not-helpful';
type MessageFeedbackResult = {
    /**
     * The message ID
     */
    message_id: string;
    /**
     * The ID of the conversation
     */
    conversation_id: string;
    /**
     * The ID of the user
     */
    user_id: string;
    /**
     * The rating
     */
    rating: MessageFeedbackRating;
    /**
     * The text the server received, including tags
     */
    text?: string;
};
type MessageFeedbackRating = 'thumbsUp' | 'thumbsDown';
type ConversationResponseEvent = {
    message?: Message;
    conversation_id?: string;
    error?: string | null;
};
type Message = {
    id: string;
    content: MessageContent;
    role: string;
    user: string | null;
    create_time: string | null;
    update_time: string | null;
    end_turn: null;
    weight: number;
    recipient: string;
    metadata: MessageMetadata;
};
type MessageContent = {
    content_type: string;
    parts: string[];
};
type MessageMetadata = any;
type MessageActionType = 'next' | 'variant';
type SendMessageOptions = {
    conversationId?: string;
    parentMessageId?: string;
    messageId?: string;
    action?: MessageActionType;
    timeoutMs?: number;
    onProgress?: (partialResponse: string) => void;
    onConversationResponse?: (response: ConversationResponseEvent) => void;
    abortSignal?: AbortSignal;
};
type SendConversationMessageOptions = Omit<SendMessageOptions, 'conversationId' | 'parentMessageId'>;
declare class ChatGPTError extends Error {
    statusCode?: number;
    statusText?: string;
    response?: Response;
    originalError?: Error;
}

/**
 * A conversation wrapper around the ChatGPTAPI. This allows you to send
 * multiple messages to ChatGPT and receive responses, without having to
 * manually pass the conversation ID and parent message ID for each message.
 */
declare class ChatGPTConversation {
    api: ChatGPTAPI;
    conversationId: string;
    parentMessageId: string;
    /**
     * Creates a new conversation wrapper around the ChatGPT API.
     *
     * @param api - The ChatGPT API instance to use
     * @param opts.conversationId - Optional ID of a conversation to continue
     * @param opts.parentMessageId - Optional ID of the previous message in the conversation
     */
    constructor(api: ChatGPTAPI, opts?: {
        conversationId?: string;
        parentMessageId?: string;
    });
    /**
     * Sends a message to ChatGPT, waits for the response to resolve, and returns
     * the response.
     *
     * If this is the first message in the conversation, the conversation ID and
     * parent message ID will be automatically set.
     *
     * This allows you to send multiple messages to ChatGPT and receive responses,
     * without having to manually pass the conversation ID and parent message ID
     * for each message.
     *
     * @param message - The prompt message to send
     * @param opts.onProgress - Optional callback which will be invoked every time the partial response is updated
     * @param opts.onConversationResponse - Optional callback which will be invoked every time the partial response is updated with the full conversation response
     * @param opts.abortSignal - Optional callback used to abort the underlying `fetch` call using an [AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)
     *
     * @returns The response from ChatGPT
     */
    sendMessage(message: string, opts?: SendConversationMessageOptions): Promise<string>;
}

declare class ChatGPTAPI {
    protected _sessionToken: string;
    protected _clearanceToken: string;
    protected _markdown: boolean;
    protected _debug: boolean;
    protected _apiBaseUrl: string;
    protected _backendApiBaseUrl: string;
    protected _userAgent: string;
    protected _headers: Record<string, string>;
    protected _user: User | null;
    protected _accessTokenCache: ExpiryMap<string, string>;
    /**
     * Creates a new client wrapper around the unofficial ChatGPT REST API.
     *
     * Note that your IP address and `userAgent` must match the same values that you used
     * to obtain your `clearanceToken`.
     *
     * @param opts.sessionToken = **Required** OpenAI session token which can be found in a valid session's cookies (see readme for instructions)
     * @param opts.clearanceToken = **Required** Cloudflare `cf_clearance` cookie value (see readme for instructions)
     * @param apiBaseUrl - Optional override; the base URL for ChatGPT webapp's API (`/api`)
     * @param backendApiBaseUrl - Optional override; the base URL for the ChatGPT backend API (`/backend-api`)
     * @param userAgent - Optional override; the `user-agent` header to use with ChatGPT requests
     * @param accessTokenTTL - Optional override; how long in milliseconds access tokens should last before being forcefully refreshed
     * @param accessToken - Optional default access token if you already have a valid one generated
     * @param heaaders - Optional additional HTTP headers to be added to each `fetch` request
     * @param debug - Optional enables logging debugging into to stdout
     */
    constructor(opts: {
        sessionToken: string;
        clearanceToken: string;
        /** @defaultValue `true` **/
        markdown?: boolean;
        /** @defaultValue `'https://chat.openai.com/api'` **/
        apiBaseUrl?: string;
        /** @defaultValue `'https://chat.openai.com/backend-api'` **/
        backendApiBaseUrl?: string;
        /** @defaultValue `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'` **/
        userAgent?: string;
        /** @defaultValue 1 hour **/
        accessTokenTTL?: number;
        /** @defaultValue `undefined` **/
        accessToken?: string;
        /** @defaultValue `undefined` **/
        headers?: Record<string, string>;
        /** @defaultValue `false` **/
        debug?: boolean;
    });
    /**
     * Gets the currently signed-in user, if authenticated, `null` otherwise.
     */
    get user(): User;
    /** Gets the current session token. */
    get sessionToken(): string;
    /** Gets the current Cloudflare clearance token (`cf_clearance` cookie value). */
    get clearanceToken(): string;
    /** Gets the current user agent. */
    get userAgent(): string;
    /**
     * Sends a message to ChatGPT, waits for the response to resolve, and returns
     * the response.
     *
     * If you want to receive a stream of partial responses, use `opts.onProgress`.
     * If you want to receive the full response, including message and conversation IDs,
     * you can use `opts.onConversationResponse` or use the `ChatGPTAPI.getConversation`
     * helper.
     *
     * @param message - The prompt message to send
     * @param opts.conversationId - Optional ID of a conversation to continue
     * @param opts.parentMessageId - Optional ID of the previous message in the conversation
     * @param opts.messageId - Optional ID of the message to send (defaults to a random UUID)
     * @param opts.action - Optional ChatGPT `action` (either `next` or `variant`)
     * @param opts.timeoutMs - Optional timeout in milliseconds (defaults to no timeout)
     * @param opts.onProgress - Optional callback which will be invoked every time the partial response is updated
     * @param opts.onConversationResponse - Optional callback which will be invoked every time the partial response is updated with the full conversation response
     * @param opts.abortSignal - Optional callback used to abort the underlying `fetch` call using an [AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)
     *
     * @returns The response from ChatGPT
     */
    sendMessage(message: string, opts?: SendMessageOptions): Promise<string>;
    /**
     * @returns `true` if the client has a valid acces token or `false` if refreshing
     * the token fails.
     */
    getIsAuthenticated(): Promise<boolean>;
    /**
     * Refreshes the client's access token which will succeed only if the session
     * is still valid.
     */
    ensureAuth(): Promise<string>;
    /**
     * Attempts to refresh the current access token using the ChatGPT
     * `sessionToken` cookie.
     *
     * Access tokens will be cached for up to `accessTokenTTL` milliseconds to
     * prevent refreshing access tokens too frequently.
     *
     * @returns A valid access token
     * @throws An error if refreshing the access token fails.
     */
    refreshAccessToken(): Promise<string>;
    /**
     * Gets a new ChatGPTConversation instance, which can be used to send multiple
     * messages as part of a single conversation.
     *
     * @param opts.conversationId - Optional ID of the previous message in a conversation
     * @param opts.parentMessageId - Optional ID of the previous message in a conversation
     * @returns The new conversation instance
     */
    getConversation(opts?: {
        conversationId?: string;
        parentMessageId?: string;
    }): ChatGPTConversation;
}

declare function markdownToText(markdown?: string): string;

/**
 * Represents everything that's required to pass into `ChatGPTAPI` in order
 * to authenticate with the unofficial ChatGPT API.
 */
type OpenAIAuth = {
    userAgent: string;
    clearanceToken: string;
    sessionToken: string;
    cookies?: Record<string, Protocol.Network.Cookie>;
};
/**
 * Bypasses OpenAI's use of Cloudflare to get the cookies required to use
 * ChatGPT. Uses Puppeteer with a stealth plugin under the hood.
 *
 * If you pass `email` and `password`, then it will log into the account and
 * include a `sessionToken` in the response.
 *
 * If you don't pass `email` and `password`, then it will just return a valid
 * `clearanceToken`.
 *
 * This can be useful because `clearanceToken` expires after ~2 hours, whereas
 * `sessionToken` generally lasts much longer. We recommend renewing your
 * `clearanceToken` every hour or so and creating a new instance of `ChatGPTAPI`
 * with your updated credentials.
 */
declare function getOpenAIAuth({ email, password, browser, timeoutMs, isGoogleLogin }: {
    email?: string;
    password?: string;
    browser?: Browser;
    timeoutMs?: number;
    isGoogleLogin?: boolean;
}): Promise<OpenAIAuth>;
/**
 * Launches a non-puppeteer instance of Chrome. Note that in my testing, I wasn't
 * able to use the built-in `puppeteer` version of Chromium because Cloudflare
 * recognizes it and blocks access.
 */
declare function getBrowser(launchOptions?: PuppeteerLaunchOptions): Promise<Browser>;
/**
 * Gets the default path to chrome's executable for the current platform.
 */
declare const defaultChromeExecutablePath: () => string;

export { AvailableModerationModels, ChatGPTAPI, ChatGPTConversation, ChatGPTError, ContentType, ConversationJSONBody, ConversationResponseEvent, Message, MessageActionType, MessageContent, MessageFeedbackJSONBody, MessageFeedbackRating, MessageFeedbackResult, MessageFeedbackTags, MessageMetadata, Model, ModelsResult, ModerationsJSONBody, ModerationsJSONResult, OpenAIAuth, Prompt, PromptContent, Role, SendConversationMessageOptions, SendMessageOptions, SessionResult, User, defaultChromeExecutablePath, getBrowser, getOpenAIAuth, markdownToText };
