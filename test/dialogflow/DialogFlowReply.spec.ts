import { expect } from "chai";
import * as _ from "lodash";
import {
  DialogFlowReply,
} from "../../src/platforms/dialogflow";

/* tslint:disable-next-line:no-var-requires */
const rawEvent = require("../requests/dialogflow/launchIntent.json");

describe("DialogFlowReply", () => {
  let reply: DialogFlowReply;

  beforeEach(() => {
    reply = new DialogFlowReply();
  });

  describe("addStatement", () => {
    it("should add to both the speech and richResponse", () => {
      reply.addStatement("THIS IS A TEST");
      expect(reply.speech).to.equal("<speak>THIS IS A TEST</speak>");
      expect(
        _.get(reply, "payload.google.richResponse.items[0]"),
      ).to.deep.equal({
        simpleResponse: { textToSpeech: "<speak>THIS IS A TEST</speak>" },
      });
    });
  });

  describe("clear", () => {
    it("should empty the rich response, speech and reprompts", () => {
      reply.addStatement("THIS IS A TEST");
      reply.addReprompt("THIS IS A TEST REPROMPT");
      reply.clear();

      expect(reply.speech).to.equal("");
      expect(_.get(reply, "payload.google.richResponse")).to.be.undefined;
      expect(reply.payload.google.noInputPrompts).to.be.empty;
    });
  });
});
