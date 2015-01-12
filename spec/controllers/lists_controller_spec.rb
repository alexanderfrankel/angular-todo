require 'spec_helper'

describe ListsController do
  render_views
  describe "index" do
    before do
      List.create!(name: "cool")
      List.create!(name: "cool2")
      List.create!(name: "not")

      xhr :get, :index, format: :json, keywords: keywords
    end

    subject(:results) { JSON.parse(response.body) }

    def extract_names(results)
      results.map { |result| result["name"] }
    end

    context "when the search finds results" do
      let(:keywords) { 'cool' }
      it 'should 200' do
        expect(response.status).to eq(200)
      end
      it 'should return 2 results' do
        expect(results.size).to eq(2)
      end
      it 'should include cool' do
        expect(extract_names(results)).to include('cool')
      end
      it 'should include cool 2' do
        expect(extract_names(results)).to include('cool2')
      end
      it 'should not include not' do
        expect(extract_names(results)).to_not include('not')
      end
    end

    context "when the search does not find results" do
      let(:keywords) { 'noooooo' }
      it 'should 200' do
        expect(response.status).to eq(200)
      end
      it 'should return no results' do
        expect(results.size).to eq(0)
      end
    end
  end
end
