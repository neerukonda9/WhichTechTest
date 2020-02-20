Feature: Review Television
  As a public user, I want to review televisions on the TV review page

Background: I navigate to tvReviewPage

  Given I navigate to the tvReviewPage

@Reviewpage
Scenario: Verify if All Televisions link is shown
  When the page loads
  Then I should see allTelevisions link

@Reviewpage @ignore
Scenario: Verify I land in tv and entertainment page
  When the page loads
  Then I see tv and home entertaniment link

@Reviewpage @ignore
Scenario: Verify if television reviews are dispolayed
  When the page loads
  Then I see the television reviews results