import { IInputs, IOutputs } from "./generated/ManifestTypes";
import Clarity from "@microsoft/clarity";

export class MicrosoftClarityPlugin implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    // Clarity Project Code
    private _clarityProjectCode: string;
    // Unique Identifier for the Customer
    private _customId: string;
    // A custom session identifier.
    private _customSessionId: string;
    // A custom page identifier
    private _customPageId: string;
   // A firednly name for the customer
    private _friendlyName: string;
  
    private _notifyOutputChanged: () => void;

    private _context: ComponentFramework.Context<IInputs>;

    /**
     * Empty constructor.
     */
    constructor()
    {

    }

    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement): void
    {
        this._context = context;
        this._clarityProjectCode = context.parameters.clarityProjectCode.raw!;
        this._customId = context.parameters.clarityCustomId.raw!;
        this._customSessionId = context.parameters.clarityCustomSessionId.raw || "";
        this._customPageId = context.parameters.clarityCustomPageId.raw || "";
        this._friendlyName = context.parameters.clarityFriendlyName.raw || "";

        this._notifyOutputChanged = notifyOutputChanged;

        // Initialise Clarity Connection
        Clarity.init(this._clarityProjectCode);
        // Initialize Clarity with custom identifiers
        Clarity.identify(this._customId, this._customSessionId, this._customPageId, this._friendlyName);
    }

    public updateView(context: ComponentFramework.Context<IInputs>): void
    {
        const updatedProjectCode = context.parameters.clarityProjectCode.raw!;
        const updatedCustomId = context.parameters.clarityCustomId.raw!;
        const updatedCustomSessionId = context.parameters.clarityCustomSessionId.raw || "";
        const updatedCustomPageId = context.parameters.clarityCustomPageId.raw || "";
        const updatedFriendlyName = context.parameters.clarityFriendlyName.raw || "";
        
        this._context = context;

        if (this._clarityProjectCode !== updatedProjectCode) {
            this._clarityProjectCode = updatedProjectCode;
        }

        if (this._customId !== updatedCustomId) {
            this._customId = updatedCustomId;
        }

        if (this._customSessionId !== updatedCustomSessionId) {
            this._customSessionId = updatedCustomSessionId;
        }

        if (this._customPageId !== updatedCustomPageId) {
            this._customPageId = updatedCustomPageId;
        }

        if (this._friendlyName !== updatedFriendlyName) {
            this._friendlyName = updatedFriendlyName;
        }
    }

    public getOutputs(): IOutputs
    {
        return {};
    }

    public destroy(): void
    {
        // Add code to cleanup control if necessary
    }
}
