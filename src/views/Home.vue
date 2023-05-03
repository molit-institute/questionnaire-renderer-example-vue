<template>
  <div class="home">
    <div class="quest-container">
      <b-row>
        <b-col md="5">
          <div class="viewer" v-if="demoQuestionnaire != null && subject != null && showQuestionnaire">
            <QRView :fhirBaseUrl="fhirBaseUrl" :questionnaire="demoQuestionnaire"
              :questionnaireResponse="questionnaireResponse" :showOnlySummary="showOnlySummary" :subject="subject"
              :locale="locale" :mode="mode" :showSummaryRemarks="showSummaryRemarks" :token="token"
              :enableSendQuestionnaireResponse="enableSendQuestionnaireResponse"
              :informationPageText="informationPageText" :enableInformationPage="enableInformationPage"
              :trademarkText="trademarkText" :enableGroupDescription="enableGroupDescription"
              :enableFullQuestionnaireResponse="enableFullQuestionnaireResponse" :enableReturn="enableReturn"
              :enableSummary="enableSummary" :summaryText="summaryText" :questionnaireUrl="questionnaireUrl"
              @newQuestionnaireResponse="newQuestionnaireResponse($event)" />
          </div>
        </b-col>
        <b-col class="output" v-if="showQuestionnaire">
          <div style="padding: 20px 0;">
            <vue-toggles :value="input" @click="input = !input" width="80" height="30" checkedText="Input"
              uncheckedText="Output" checkedBg="#319129"></vue-toggles>
          </div>
          <div v-if="input">
            <h5 style="padding: 20px 0">Questionnaire</h5>
            <br>
            <pre>
              {{ demoQuestionnaire }}
            </pre>
          </div>
          <div v-if="!input">
            <h5 style="padding: 20px 0">QuestionnaireResponse</h5>
            <br>
            <pre>
            {{ qR }}
          </pre>
          </div>

        </b-col>
      </b-row>

      <hr v-if="showQuestionnaire">
      <div>
        <div class="title">
          <h3>Settings</h3>
          <div><i>You can change properties here. Some changes require a restart</i></div>

        </div>
        <div class="settings-container">

          <!-- Settings stuff -->
          <div class="subtitle">
            <b>General</b>
          </div>
          <b-row class="setting-item">
            <b-col>
              Select mode
            </b-col>
            <b-col class="settings-select">
              <select name="mode" id="mode" v-model="mode">
                <option value="stepper-questionnaire">One question per page</option>
                <!-- <option value="grouped-questionnaire">Gruppiert</option> -->
                <option value="full-questionnaire">All quesitons on one page</option>
              </select>
            </b-col>
          </b-row>
          <b-row class="setting-item">
            <b-col>
              Select language
            </b-col>
            <b-col class="settings-select">
              <select name="mode" id="mode" v-model="locale">
                <option value="de">German</option>
                <!-- <option value="grouped-questionnaire">Gruppiert</option> -->
                <option value="en">English</option>
              </select>
            </b-col>
          </b-row>
          <b-row class="setting-item">
            <b-col>
              FHIR-Url
            </b-col>
            <b-col class="settings-select">
              <input type="textarea" v-model="fhirBaseUrl">
            </b-col>
          </b-row>
          <!-- <b-row class="setting-item">
            <b-col>
              Questionnaire-Url to use your own questionnaire
            </b-col>
            <b-col class="settings-select">
              <input type="textarea" v-model="questionnaireUrl">
            </b-col>
          </b-row> -->
          <b-row class="setting-item">
            <b-col>
              Enable sending questionnaireResponses to fhir-server
            </b-col>
            <b-col class="settings-select">
              <vue-toggles :value="enableSendQuestionnaireResponse"
                @click="enableSendQuestionnaireResponse = !enableSendQuestionnaireResponse" width="60" checkedText="An"
                uncheckedText="Aus" checkedBg="#319129"></vue-toggles>
            </b-col>
          </b-row>

          <b-row class="setting-item">
            <b-col>
              Text for trademark/copyright
            </b-col>
            <b-col class="settings-select">
              <input type="textarea" v-model="trademarkText">
            </b-col>
          </b-row>
          <b-row class="setting-item">
            <b-col>Enable shortend questionnaireResponses</b-col>
            <b-col class="settings-select">
              <vue-toggles :value="enableFullQuestionnaireResponse"
                @click="enableFullQuestionnaireResponse = !enableFullQuestionnaireResponse" width="60" checkedText="An"
                uncheckedText="Aus" checkedBg="#319129"></vue-toggles>
            </b-col>
          </b-row>
          <div class="subtitle"><b>Information page</b></div>
          <b-row class="setting-item">
            <b-col>Enable information page</b-col>
            <b-col class="settings-select">
              <vue-toggles :value="enableInformationPage" @click="enableInformationPage = !enableInformationPage"
                width="60" checkedText="An" uncheckedText="Aus" checkedBg="#319129"></vue-toggles>
            </b-col>
          </b-row>
          <b-row class="setting-item">
            <b-col>Additional text on information page</b-col>
            <b-col class="settings-select">
              <input type="textarea" v-model="informationPageText">
            </b-col>
          </b-row>

          <div class="subtitle"><b>Questions</b></div>
          <b-row class="setting-item">
            <b-col>
              Enable group descriptions
            </b-col>
            <b-col class="settings-select">
              <vue-toggles :value="enableGroupDescription" @click="enableGroupDescription = !enableGroupDescription"
                width="60" checkedText="An" uncheckedText="Aus" checkedBg="#319129"></vue-toggles>
            </b-col>
          </b-row>
          <b-row class="setting-item">
            <b-col>
              Allow a return from questions
            </b-col>
            <b-col class="settings-select">
              <vue-toggles :value="enableReturn" @click="enableReturn = !enableReturn" width="60" checkedText="An"
                uncheckedText="Aus" checkedBg="#319129"></vue-toggles>
            </b-col>
          </b-row>

          <div class="subtitle"><b>Summary</b></div>
          <b-row class="setting-item">
            <b-col>
              Show summary
            </b-col>
            <b-col class="settings-select">
              <vue-toggles :value="enableSummary" @click="enableSummary = !enableSummary" width="60" checkedText="An"
                uncheckedText="Aus" checkedBg="#319129"></vue-toggles>
            </b-col>
          </b-row>
          <b-row class="setting-item">
            <b-col>
              Text in summary
            </b-col>
            <b-col class="settings-select">
              <input type="textarea" v-model="summaryText">
            </b-col>
          </b-row>

        </div>
        <div class="button-container">
          <b-button @click="startQuestionnaire()" v-if="!showQuestionnaire && !started" class="btn btn-primary">Start
          </b-button>
          <b-button @click="restartQuestionnaire()" v-if="showQuestionnaire || started" class="btn btn-primary">Restart
          </b-button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import QRView from "@/components/QRView.vue";
import VueToggles from 'vue-toggles';

export default {
  name: "Home",
  components: {
    VueToggles,
    QRView,
  },
  data() {
    return {
      started: false,
      showQuestionnaire: false,
      fhirBaseUrl: "https://fhir.molit.eu/fhir",
      questionnaireUrl: null,
      locale: "de",
      mode: "stepper-questionnaire",
      informationPageText: "",
      enableInformationPage: true,
      enableSummary: false,
      subject: { "resourceType": "Patient", "id": "817" },
      questionnaireResponse: null,
      showOnlySummary: false,
      showSummaryRemarks: false,
      token: null,
      enableSendQuestionnaireResponse: true,
      enableFullQuestionnaireResponse: false,
      trademarkText: null,
      enableGroupDescription: false,
      enableReturn: false,
      summaryText: "",
      qR: null,
      input: true,
      demoQuestionnaire:{"resourceType":"Questionnaire","url":"http://fhir.molit.eu/fhir/Questionnaire/demo-questionnaire", "id": "demo-questionnaire","title":"Demo Questionnaire","status":"active","description":"This a short demo questionnaire showcasing different types of questions","publisher":"MOLIT Institut gGmbH","item":[{"linkId":"1","prefix":"1.","text":"Please enter your age","type":"integer","required":true},{"linkId":"2","prefix":"2.","text":"Do you have any physical pain","type":"boolean","required":true},{"linkId":"3","text":"Questions for users with physical pain over the age of 60","type":"group","required":false,"enableWhen":[{"question":"2","operator":"=","answerBoolean":true}],"item":[{"linkId":"3.1","prefix":"3.1.","text":"Do you find it difficult to take a long walk?","type":"choice","answerValueSet":"http://fhir.molit.eu/fhir/ValueSet/demo-4-answers"},{"linkId":"3.2","prefix":"3.2.","text":"Do you have to lie in bed or sit in an armchair during the day?","type":"choice","answerValueSet":"http://fhir.molit.eu/fhir/ValueSet/demo-4-answers"},{"linkId":"3.3","prefix":"3.3.","text":"Do you need help eating, dressing, washing or using the toilet?","type":"choice","answerValueSet":"http://fhir.molit.eu/fhir/ValueSet/demo-4-answers"}]}]}
    };
    },
  methods: {
    startQuestionnaire(){
      this.showQuestionnaire = true;
      this.started = true;
      if(this.questionnaireUrl){
        console.log("questionnaireURl:",this.questionnaireUrl)
        this.demoQuestionnaire = null;
      }
    },
    restartQuestionnaire() {
      this.showQuestionnaire = false;
      setTimeout(() => {
        this.showQuestionnaire = true;
      }, 250)

    },
    newQuestionnaireResponse(object) {
      this.qR = object;
    }
  },
};
</script>
<style>
.viewer {
  height: 100vh;
  overflow-y: auto;
}

.output {
  overflow-y: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
  height: 100vh;
}

.title {
  padding: 20px 20%;
}

.subtitle {
  padding: 10px 0;
}

.setting-item {
  padding: 5px 0;
}

.button-container {
  padding: 20px 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.settings-container {
  padding: 10px 20%;
}

.settings-select {
  display: flex;
  justify-content: end;
}
</style>
