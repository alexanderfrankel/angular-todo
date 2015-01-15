require 'spec_helper'

feature "View a list", js: true do
  before do
    List.create!(name: 'cool')
    List.create!(name: 'not')
  end

  scenario "view one recipe" do
    visit '/'
    fill_in "keywords", with: 'cool'
    click_on "Search"

    click_on "cool"

    expect(page).to have_content("cool")
    expect(page).to_not have_content("not")
  end
end
