
import { Part } from ".prisma/client";
import { useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";

export default function SelectPart() {
  const allParts = useLoaderData().sort((a: Part, b: Part) => a.name.localeCompare(b.name));
  const [availableParts, setAvailableParts] = useState(Array.from(allParts) as Part[]);
  const [categories, setCategories] = useState([""]);
  const [subcategories, setSubcategories] = useState([""]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [selectedPart, setSelectedPart] = useState<Part | undefined>();

  useEffect(() => {
    setCategories(Array.from(new Set<string>(allParts.map((part: Part) => part.category))));
    setSubcategories(Array.from(new Set<string>(allParts.filter((part: Part) => part.category === selectedCategory).map((part: Part) => part.subcategory))));
  }, [availableParts]);

  useEffect(() => {
    selectedCategory && setAvailableParts(allParts.filter((part: Part) => part.category === selectedCategory));
    selectedSubcategory && setAvailableParts(allParts.filter((part: Part) => part.category === selectedCategory && part.subcategory === selectedSubcategory));
  }, [selectedCategory, selectedSubcategory]);


  function onCategoryChange(value: string) {
    setSelectedCategory(value);
    setSelectedSubcategory("");
    setSelectedPart(undefined);
  }

  function onSubcategoryChange(value: string) {
    setSelectedSubcategory(value);
    setSelectedPart(undefined);
  }

  return (
    <div className="p-[8rem]">
      <label className="text-white text-3xl">Find a part</label>
      <div id="category-select">
        <select onChange={(event) => onCategoryChange(event.target.value)}>
          <option className="hidden" value="default">Select a category</option>
          {categories && categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div id="subcategory-select">
        <select onChange={(event) => onSubcategoryChange(event.target.value)} disabled={!selectedCategory}>
          <option className="hidden" value="default">Select a subcategory</option>
          {subcategories && subcategories.map((subcategory) => (
            <option key={subcategory} value={subcategory}>
              {subcategory}
            </option>
          ))}
        </select>
      </div>
      <div id="partname-select">
        <select disabled={!selectedSubcategory}>
          <option className="hidden" value="default">Select a part name</option>
          {availableParts && availableParts.map((part: Part) => (
            <option key={part.id} value={part.id}>
              {part.name}
            </option>
          ))}
        </select>
      </div>
      {selectedPart && (
        <div>selectedPart.name</div>
      )}
    </div >
  )
}
