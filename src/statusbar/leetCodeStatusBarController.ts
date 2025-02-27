// Copyright (c) jdneo. All rights reserved.
// Licensed under the MIT license.

import { ConfigurationChangeEvent, Disposable, workspace, WorkspaceConfiguration } from "vscode";
import { UserStatus, userContestRanKingBase } from "../shared";
import { LeetCodeStatusBarItem } from "./LeetCodeStatusBarItem";

class LeetCodeStatusBarController implements Disposable {
    private statusBar: LeetCodeStatusBarItem;
    private configurationChangeListener: Disposable;

    constructor() {
        this.statusBar = new LeetCodeStatusBarItem();
        this.setStatusBarVisibility();

        this.configurationChangeListener = workspace.onDidChangeConfiguration((event: ConfigurationChangeEvent) => {
            if (event.affectsConfiguration("leetcode.enableStatusBar")) {
                this.setStatusBarVisibility();
            }
        }, this);
    }

    public updateStatusBar(status: UserStatus, user?: string, UserContestInfo?: userContestRanKingBase | undefined): void {
        this.statusBar.updateStatusBar(status, user, UserContestInfo);
    }

    public dispose(): void {
        this.statusBar.dispose();
        this.configurationChangeListener.dispose();
    }

    private setStatusBarVisibility(): void {
        if (this.isStatusBarEnabled()) {
            this.statusBar.show();
        } else {
            this.statusBar.hide();
        }
    }

    private isStatusBarEnabled(): boolean {
        const configuration: WorkspaceConfiguration = workspace.getConfiguration("leetcode-problem-rating");
        return configuration.get<boolean>("enableStatusBar", true);
    }
}

export const leetCodeStatusBarController: LeetCodeStatusBarController = new LeetCodeStatusBarController();
