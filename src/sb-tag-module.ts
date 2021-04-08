import { Container } from 'inversify';
import { SBTagService } from './services/interface/sb-tag-service';
import { InjectionTokens } from '../injection-tokens';
import { SBTagServiceImpl } from './services/impl/sb-tag-service-impl';

export class SBTagModule {
    private _container: Container;
    private static _instance?: SBTagModule;
    private _isInitialised = false;
    private onUpdateConfigCallback?: () => void;



    public static get instance(): SBTagModule {
        if (!SBTagModule._instance) {
            SBTagModule._instance = new SBTagModule();
        }

        return SBTagModule._instance;
    }

    get isInitialised(): boolean {
        return this._isInitialised;
    }

    get SBTagService(): SBTagService {
        return this._container.get<SBTagService>(InjectionTokens.services.SB_TAG_SERVICE);
    }

    updateConfig() {
        const mode: 'rebind' | 'bind' = this._isInitialised ? 'rebind' : 'bind';

        this._container[mode]<SBTagService>(InjectionTokens.services.SB_TAG_SERVICE).
            to(SBTagServiceImpl).inSingletonScope();

        if (mode === 'rebind' && this.onUpdateConfigCallback) {
            this.onUpdateConfigCallback();
        }
    }

    public async init(onConfigUpdate?: () => void) {
        if (onConfigUpdate) {
            this.onUpdateConfigCallback = onConfigUpdate;
        }
        this._container = new Container();

        this._container.bind<Container>(InjectionTokens.CONTAINER).toConstantValue(this._container);
        this.updateConfig();
        this._isInitialised = true;
    }
}