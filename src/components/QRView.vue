<template>
  <div class="questionnaire-container" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <questionnaire-renderer
      :mode.prop="mode"
      :subject.prop="subject"
      :questionnaire.prop="questionnaire"
      :baseUrl.prop="fhirBaseUrl"
      :danger.prop="danger"
      :locale.prop="locale"
      :enableReturn.prop="enableReturn"
      :enableSummary.prop="enableSummary"
      :enableInformalLocale.prop="true"
      :enableSendQuestionnaireResponse.prop="enableSendQuestionnaireResponse"
      :enableInformationPage.prop="enableInformationPage"
      :enableGroupDescription.prop="enableGroupDescription"
      :enableFullQuestionnaireResponse.prop="enableFullQuestionnaireResponse"
      :informationPageText.prop="informationPageText"
      :summaryText.prop="showSummaryText"
      :questionnaireResponse.prop="questionnaireResponse"
      :showOnlySummary.prop="showOnlySummary"
      :showSummaryRemarks.prop="showSummaryRemarks"
      :token="token"
      :trademarkText.prop="trademarkText"
      :vasVertical.prop="true"
      :vasShowSelectedValue.prop="true"
      :vasSelectedValueLabel.prop="vasSelectedValueLabel"
      @addRemarks="emitRemarksEvent()"
      @exit="onExit()"
      @finished="onFinished($event.detail)"
      @updated="onUpdated($event.detail) "
      @closeSummary="onCloseSummary()"
      @errorLog="onError($event.detail)"
    ></questionnaire-renderer>
  </div>
</template>

<script>
export default {
  name: "QRView",
  data() {
    return {
      danger: "#F32C2C",
      vasSelectedValueLabel: "YOUR HEALTH TODAY =",
    };
  },
  props: {
    token: {
      type: String,
      required: false,
    },
    fhirBaseUrl: {
      type: String,
      required: true,
    },
    questionnaire: {
      type: Object,
      required: false,
    },
    subject: {
      type: Object,
      required: true,
    },
    locale: {
      type: String,
      default: "de",
    },
    mode: {
      type: String,
      default: "stepper-questionnaire",
    },
    questionnaireResponse: {
      type: Object,
      require: false,
    },
    showOnlySummary: {
      type: Boolean,
      default: false,
    },
    showSummaryRemarks: {
      type: Boolean,
      default: true,
    },
    enableSendQuestionnaireResponse: {
      type: Boolean,
      default: true,
    },
    enableInformationPage: {
      type: Boolean,
      default: false,
    },
    informationPageText: {
      type: String,
      default: "",
    },
    trademarkText: {
      type: String,
      default: null,
    },
    enableGroupDescription: {
      type: Boolean,
      default: false
    },
    enableFullQuestionnaireResponse:{
      type: Boolean,
      default: false
    },
    enableReturn: {
      type: Boolean,
      default:false
    },
    enableSummary:{
      type: Boolean,
      default: false
    },
    summaryText: {
      type: String,
      default: ""
    }
  },
  computed: {
    showSummaryText() {
      if (this.summaryText) return this.summaryText;
      else return '';
    },
  },
  components: {},
  methods: {
    onError(event){
      console.info(event.detail)
    },
    onExit() {
    },
    emitRemarksEvent() {
      this.$emit("addRemarks");
    },
    onCloseSummary() {
    },
    onFinished(object) {
      this.$emit("newQuestionnaireResponse",object)
    },
    onUpdated(object){
      this.$emit("newQuestionnaireResponse",object)
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.questionnaire-container {
  height: 100vh;
}
</style>

<style lang="scss">
@import "../scss/_variables.scss";

.qr-vasQuestion-labels-vertical{
  font-size:13px
}

// TRADEMARK
.qr-stepperQuestionnaire-trademark {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #6c6c6c;
  font-family: "Open Sans";
  font-style: italic;
  font-size: 13px;
  padding: 0 20px;
  text-align: center;
}

.qr-summary-trademark {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #6c6c6c;
  font-family: "Open Sans";
  font-style: italic;
  font-size: 13px;
  padding: 0 20px;
  text-align: center;
}

.qr-informationPage-trademark {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #6c6c6c;
  font-family: "Open Sans";
  font-style: italic;
  font-size: 13px;
  padding: 0 20px;
  text-align: center;
}

// INFORMATIONPAGE
.qr-informationPage-container {
  height: 100vh;
}

.qr-informationPage-info {
  height: 50vh;
  overflow-y: auto;
  padding: 0 10%;
}

.qr-informationPage-title {
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  padding: 16px 0px;
  height: 24vh;
  font-weight: bold;
  font-size: 34px;
}

.qr-informationPage-description {
  margin: 0 0 15px 0;
  color: #4c8a98;
  text-align: center;
  font-weight: 700;
  font-size: 24px;
}

.qr-informationPage-text {
  margin: 0 0 15px 0;
  color: #4c8a98;
  text-align: center;
  font-size: 20px;
  height: 10vh;
}

.qr-informationPage-publisher-container {
  margin: 20px 0 10px 0;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
}

.qr-informationPage-publisher-name {
  font-weight: 500;
  text-align: start;
}

.qr-informationPage-questions-container {
  margin: 20px 0 10px 0;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
}

.qr-informationPage-questions-number {
  font-weight: 500;
}

.qr-informationPage-button {
  height: 15vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

// GROUP
group-question {
  background-color: #fde5be;
  min-height: 20vh;
  margin-bottom: 30vh;
  padding: 10px 30px 20px 30px;
  overflow-y: auto;
  svg {
    height: 30px;
    width: 30px;
  }
  path {
    fill: #f3722c !important;
  }
  .qr-groupQuestion-title {
    background-color: #fde5be;
    color: #237297;
    font-size: 20px;
    font-weight: bold;
  }
  .qr-groupQuestion-display-text {
    color: #237297;
    padding: 30px 0 0px 0;
    font-size: 16px;
  }
}

// SUMMARY REMARKS
.qr-summary-remarks-title {
  font-size: 1.2rem;
  color: #f3722c;
}
.qr-summary-remarks-text {
  color: #f3722c;
}
.qr-summary-remarks-icon {
  float: right;
  height: 20px;
  svg {
    height: 24px !important;
    width: 24px !important;
  }
  path {
    fill: #f3722c !important;
  }
}
// SUMMARY
.qr-summary-container {
  padding: 0 0px;
}

.qr-summary-group-item {
  margin: 0 0px 0 20px;
}

.qr-summary-title {
  font-size: 1.3rem !important;
  color: #f8961e;
  height: 12vh;
  background: #fde5be;
  text-align: start !important;
  padding: 10px 0 0 25px;
}
.qr-summary-answeredQuestions {
  font-size: 1.2em;
  font-weight: 500;
  padding: 10px 0 0 0;
  color: #f3722c;
}
.qr-summary-information {
  padding: 3px 0 15px 0;
  padding-right: 5px;
}
.qr-summary-content {
  overflow-y: auto;
  height: 68vh;
  padding: 0 25px;
}
.qr-summary-display-text {
  color: #237297;
  padding: 18px 0 0px 0;
  font-size: 16px;
}
.qr-summary-items {
  padding-right: 5px;
}
.qr-summary-item-prefix {
  font-size: 1.2em;
  font-weight: 500;
  color: #237297;
}
.qr-summary-item-text {
  font-size: 1.2em;
  font-weight: 500;
  color: #237297;
}
.qr-summary-item-yourAnswer {
  color: #f8961e;
  font-size: 1.1rem;
}
.qr-summary-item-answer {
  color: #f8961e;
  font-size: 1.1rem;
}
.qr-summary-item-editIcon {
  float: right;
  svg {
    height: 23px !important;
    width: 23px !important;
  }
  path {
    fill: #f8961e !important;
  }
}

.qr-displayQuestion-text{
  color: #237297;
}

.qr-summary-card {
  display: flex;
  justify-content: center;
  align-items: center;
  .spinner-text {
    font-size: 18px !important;
  }
}
.qr-summary-buttonContainer {
  padding: 10px 0 10px 0 !important;
}

.qr-summary-buttons {
  display: flex;
  align-content: center;
  justify-content: space-around !important;
}
.qr-summary-ok-button {
  display: flex;
  align-content: center;
  justify-content: space-around !important;
  min-width: 40%;
}

//STEPPER
.card {
  margin: 0 !important;
}
.qr-stepperQuestionnaire-spinner {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.qr-stepperQuestionnaire-progress-progressBar {
  display: none;
}
.qr-stepperQuestionnaire-progress {
  display: none;
}
.qr-stepperQuestionnaire-group-text {
  background-color: #fde5be;
  padding-left: 30px;
  color: #237297 !important;
}
.qr-stepperQuestionnaire-questions {
  height: 68vh;
  overflow-y: auto;
}
.qr-stepperQuestionnaire-buttonContainer {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin: 20px 30px;
  height: 6vh;
  background-color: "#dedede";
}
.qr-stepperQuestionnaire-progress-container {
  color: #f8961e !important;
  font-size: 18px;
  padding: 15px 30px 10px 30px;
  background-color: #fde5be;
  .color-grey {
    color: #f8961e !important;
  }
  .qr-stepperQuestionnaire-title {
    font-size: 20px;
  }
}
//SPINNER
.qr-spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
//QUESTION
.qr-question-title {
  background-color: #fde5be;
  padding: 0 30px 0 30px;
  min-height: 13vh;
  line-height: 0.75 !important;
  margin: 0 !important;
  .qr-question-text {
    color: #237297;
    font-size: 18px;
    padding: 15px 0 0 0;
    line-height: 5px !important;
  }
  .qr-question-prefix {
    color: #237297;
    font-size: 18px;
  }
}
.qr-question-mandatoryQuestion {
  height: 3vh;
  background-color: #fde5be;
  padding: 0 30px 30px 30px;
  font-size: 15px;
}
br {
  display: none;
}
.qr-question-container {
  hr {
    display: none;
  }
}

//CHOICE

.qr-choiceQuestion-answerDisplay {
  color: #4c8a98;
  font-size: 15px !important;
  font-weight: 500 !important;
}
.qr-choiceQuestion-radioButton {
  margin: 3.5px !important;
  .custom-control-input:checked ~ .custom-control-label::before {
    color: #fff;
    border-color: #7b1fa2;
  }
}
.qr-choiceQuestion-singleChoice-container {
  padding: 10px 10px;
}


.qr-vasQuestion-container-vertical {
  height: 50vh !important;
}
.qr-vasQuestion-touch-container-vertical {
  transform-origin: center 21vh !important;
  width: 50vh !important;
}
.qr-vasQuestion-input {
  background: #fac670;
}

.qr-vasQuestion-input {
  background: #fac670 !important;
}
input[type="range"]::-webkit-slider-thumb {
  border: none !important;
  height: 28px !important;
  width: 28px !important;
  border-radius: 15px !important;
  background-color: #f8961e !important;
  align-self: center;
}

.qr-vasQuestion-lower-label {
  color: #237297;
}
.qr-vasQuestion-upper-label {
  color: #237297;
}
.qr-vasQuestion-selected-value-display {
  color: #fff;
  background-color: #f8961e;
  width: 56px;
  height: 100px;
  text-align: center !important;
  font-size: 34px;
  border-radius: 5px;
  margin-top: 25px;
}
.qr-vasQuestion-selected-value-label {
  text-align: center !important;
  color: #f8961e;
  height: 150px;
}

.qr-vasQuestion-slider-ticks-vertical p {
  color: #237297;
}

//BUTTONS
.button {
  border-radius: 5px !important;
  border-width: 2.2px !important;
  font-size: 1.2em !important;
  padding-left: 0.5em !important;
  padding-right: 0.5em !important;
  font-weight: 700 !important;
  cursor: pointer;
}
.btn-lg {
  padding: 0.3rem 0.8rem;
  font-size: 1.25rem;
  border-radius: 5;
}
.btn-primary {
  color: #fff;
  border-color: #f8961e;
  background-color: #f8961e;
}
.btn-primary:active {
  background-color: white !important;
  color: #b96d0f !important;
  border-color: #b96d0f !important;
}
.btn-primary:visited {
  background-color: #f8961e !important;
  color: #fff !important;
  border-color: #f8961e !important;
}
.btn-primary:hover {
  background-color: #b96d0f !important;
  color: #fff !important;
  border-color: #b96d0f !important;
}
.btn-outline-primary {
  color: #f8961e;
  border-color: #f8961e;
}
.btn-outline-primary:active {
  background-color: white !important;
  color: #b96d0f !important;
  border-color: #b96d0f !important;
}
.btn-outline-primary:visited {
  background-color: white !important;
  color: #f8961e !important;
  border-color: #f8961e !important;
}
.btn-outline-primary:hover {
  background-color: white !important;
  color: #b96d0f !important;
  border-color: #b96d0f !important;
}
.btn-secondary:disabled {
  color: #fff;
  background-color: rgba(0, 0, 0, 0.4);
  border-color: rgba(0, 0, 0, 0.4);
}
</style>
