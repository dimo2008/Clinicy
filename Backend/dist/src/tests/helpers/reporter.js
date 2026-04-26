import { DisplayProcessor, SpecReporter, StacktraceOption } from "jasmine-spec-reporter";
class CustomProcessor extends DisplayProcessor {
    displayJasmineStarted(info, log) {
        return `${log}`;
    }
}
jasmine.getEnv().clearReporters();
jasmine.getEnv().addReporter(new SpecReporter({
    spec: {
        displayStacktrace: StacktraceOption.NONE
    },
    customProcessors: [CustomProcessor],
}));
//# sourceMappingURL=reporter.js.map