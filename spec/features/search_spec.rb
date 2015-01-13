require 'spec_helper'

feature 'Looking up lists', js: true do
  before do
    List.create!(name: 'cool')
    List.create!(name: 'cool 2')
    List.create!(name: 'not')
  end

  scenario 'finding lists' do
    visit '/'
    fill_in "keywords", with: "cool"
    click_on "Search"

    expect(page).to have_content("cool 2")
    expect(page).to_not have_content("not")
  end
end
