import { Injectable, HttpService } from '@nestjs/common';
import { LoggerService } from '../logger/logger.service';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import { CronJob, CronTime } from 'cron';
import * as moment from 'moment';
import { environment } from '../environments/environment';

@Injectable()
export class WebMenuService {

    private _webMenuToken: string;

    public get webMenuToken(): string {
        return this._webMenuToken;
    }

    constructor(private httpService: HttpService, private schedulerRegistry: SchedulerRegistry, private loggerService: LoggerService) { }

    /**
     * Get Menu Articles Api
     */
    async getWebMenu() {
        const result = await this.httpService.get(
            '',
            {
                headers: { 'authorization': `Bearer ${this._webMenuToken}` },
            }
        ).toPromise();
    }

    /**
     * Call Articles API and return token
     */
    async getTokenWebMenu(): Promise<any> {
        try {
            const result = await this.httpService.post(
                'https://development-aphilia.eu.auth0.com/oauth/token',
                {
                    client_id: environment.webMenuApi.client_id,
                    client_secret: environment.webMenuApi.client_secret,
                    audience: environment.webMenuApi.audience,
                    grant_type: environment.webMenuApi.grant_type,
                },
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            ).toPromise();

            this.updateCron(result);

            return result.data;
        } catch (e) {
            this.loggerService.error(e.response.data, 'WebMenuService getTokenWebMenu');
            throw e;
        }
    }

    /**
     * Update the cron for update token get the date of expiration and calc 10 minutes before
     * @param result 
     */
    updateCron(result) {
        const datetoUpdate = moment().valueOf() + ((result.data.expires_in * 1000) - 600000);
        const cronToken = this.schedulerRegistry.getCronJob('webMenuToken') as CronJob;
        cronToken.setTime(new CronTime(moment(datetoUpdate).utc()));
        cronToken.start();
    }

    /**
     * Crown for update token (begin after 2s and updated with the first call)
     */
    @Cron(new Date(Date.now() + 2 * 1000), {
        name: 'webMenuToken',
    })
    async updatewebMenuToken() {
        try {
            const result = await this.getTokenWebMenu();
            this._webMenuToken = result.access_token;
        } catch (e) {
            this.loggerService.error(e.message, 'WebMenuService updatewebMenuToken(Cron)');
        }

    }
}
