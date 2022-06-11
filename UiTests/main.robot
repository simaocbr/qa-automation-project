*** Settings ***
Library  SeleniumLibrary
Test Timeout    2 minutes
Suite Teardown  Close All Browsers

*** Variables ***
${WEBSITE URL}      http://localhost:3000
${BROWSER}          Chrome

${INPUT_EMAIL}       //input[@placeholder="email"]
${INPUT_PASS}       //input[@placeholder="password"]
${BUTTON_LOGIN}     //input[@type="submit"]
${BUTTON_LOGOUT}        //button[@id="logout"]
${SPAN_LOGINFO}        //*[@id="loginInfo"]
${SPAN_FAIL_LOGIN}        //span[@class="swal2-x-mark"]

${TEXT_CASE}        //textarea[@id="case"]
${SELECT_CONDITION}        //select[@id="conditions"]
${BUTTON_NEXT}        //button[@id="nextCase"]
${DIV_INFO}        //div[@id="contentInfo"] 

${EMAIL}      simao@doctor.com
${PASSWORD}      qwerty
${WRONG_EMAIL}      random@doctor.com
${WRONG_PASSWORD}      random

*** Keywords ***
open Website
    Open Browser      ${WEBSITE URL}    ${BROWSER}

insert Login
    Input Text   ${INPUT_EMAIL}      ${EMAIL}
    Input Text   ${INPUT_PASS}      ${PASSWORD}
    Click Element       ${BUTTON_LOGIN}
    Sleep       3
    Element Should Contain    ${SPAN_LOGINFO}     Logged in as

insert Wrong Login
    Input Text   ${INPUT_EMAIL}      ${WRONG_EMAIL}
    Input Text   ${INPUT_PASS}      ${WRONG_PASSWORD}
    Click Element       ${BUTTON_LOGIN}
    Sleep       3

*** Test Cases ***

Scenario 1: Login Test
    Given open Website
    When insert Login
    Then Wait Until Element Is Visible  ${BUTTON_LOGOUT}    5
    Close Browser

Scenario 2: Logout Test
    Given open Website
    When insert Login
    And Click Element   ${BUTTON_LOGOUT}
    Then Wait Until Element Is Visible  ${BUTTON_LOGIN}    5
    Close Browser

Scenario 3: Wrong Login Check
    Given open Website
    When insert Wrong Login
    Then Wait Until Element Is Visible  ${SPAN_FAIL_LOGIN}    5
    Close Browser

Scenario 4: Check Next Case Button Disabled
    Given open Website
    When insert Login
    Then Element Should Be Disabled   ${BUTTON_NEXT}
    Sleep  3
    Close Browser

Scenario 5: Fullfill all cases
    Given open Website
    When insert Login
    And Select From List By Index   ${SELECT_CONDITION}    2
    And Click Element   ${BUTTON_NEXT}
    Sleep  3
    And Select From List By Index   ${SELECT_CONDITION}    3
    And Click Element   ${BUTTON_NEXT}
    Sleep  3
    And Select From List By Index   ${SELECT_CONDITION}    4
    And Click Element   ${BUTTON_NEXT}
    Sleep  3
    Then Element Should Contain     ${DIV_INFO}     You are done.
    Close Browser